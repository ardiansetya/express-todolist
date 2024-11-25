const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const authenticateToken = (req, res, next) => {
   const token = req.header('Authorization')?.replace('Bearer ', '');
   if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
   }

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
         return res.status(403).json({ error: 'Invalid token.' });
      }
      req.user = decoded; 
      next();
   });
};

module.exports = { authenticateToken };