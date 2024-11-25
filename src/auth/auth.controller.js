const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { prisma } = require('../db/index.js')


router.post('/register', async (req, res) => {
   const { username, email, password } = req.body;

   try {

      const existingUser = await prisma.user.findUnique({
         where: { email },
      });

      if (existingUser) {
         return res.status(400).json({ error: 'Email sudah terdaftar' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
         data: {
            username,
            email,
            password: hashedPassword,
         },
      });

      res.status(201).json({ message: 'User created successfully', });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});


router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await prisma.user.findUnique({
         where: { email },
      });

      if (!user) {
         return res.status(400).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return res.status(400).json({ error: 'Invalid password' });
      }

      const token = jwt.sign(
         { userId: user.id, email: user.email },
         process.env.JWT_SECRET,
         { expiresIn: '1h' }
      );

      res.json({ token });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

module.exports = router;