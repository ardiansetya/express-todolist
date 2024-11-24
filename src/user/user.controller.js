const express = require('express');
const { getUser, insertUserData, deleteUserData, updateUserData, getUserById, getUserByName } = require('./user.service');

const router = express.Router();

// Endpoint untuk mendapatkan semua user
router.get('/users', async (req, res) => {
   try {
      const allUsers = await getUser();
      res.status(200).json({
         data: allUsers,
         message: "User berhasil ditemukan",
      });
   } catch (error) {
      res.status(500).json({
         message: "Terjadi kesalahan saat mengambil data user",
         error: error.message,
      });
   }
});

router.get('/user/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const user = await getUserById(id);
      res.status(200).json({
         data: user,
         message: "User berhasil ditemukan",
      });
   } catch (error) {
      res.status(404).json({
         message: "Terjadi kesalahan saat mengambil data user",
         error: error.message,
      });
   }
});


// Endpoint untuk menambahkan user baru
router.post('/user', async (req, res) => {
   const newUserData = req.body;

   // Validasi data yang masuk
   if (!newUserData.username || !newUserData.email || !newUserData.password) {
      return res.status(400).json({
         message: "Field username, email, dan password harus diisi",
      });
   }

   try {
      const newUser = await insertUserData(newUserData);
      res.status(201).json({
         data: newUser,
         message: "User berhasil ditambahkan",
      });
   } catch (error) {
      res.status(500).json({
         message: "Terjadi kesalahan saat menambahkan user",
         error: error.message,
      });
   }
});


router.patch('/user/:id', async (req, res) => {
   const id = req.params.id;
   const newUserData = req.body;
   try {
      const updatedUser = await updateUserData(id, newUserData);
      res.status(200).json({
         data: updatedUser,
         message: "User berhasil diperbarui",
      });
   } catch (error) {
      res.status(500).json({
         message: "Terjadi kesalahan saat memperbarui user",
      });
   }
});

router.delete('/user/:id', async (req, res) => {
   const id = req.params.id;

   try {
      const deletedUser = await deleteUserData(id);
      res.status(200).json({
         data: deletedUser,
         message: "User berhasil dihapus",
      });
   } catch (error) {
      res.status(500).json({
         message: "Terjadi kesalahan saat menghapus user",
         error: error.message,
      });
   }
});

module.exports = router;
