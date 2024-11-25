const express = require('express');
const { getTask, insertTaskData, deleteTaskData, updateTaskData, getTaskById, getTaskByName } = require('./task.service');
const { authenticateToken } = require('../middleware/middleware');

const router = express.Router();

// Endpoint untuk mendapatkan semua Task
router.get('/tasks', authenticateToken, async (req, res) => {
   const userId = req.user.userId
   try {
      const allTasks = await getTask(userId);
      res.status(200).json({
         data: allTasks,
         message: "Task berhasil ditemukan",
      });
   } catch (error) {
      res.status(400).json({
         message: "Terjadi kesalahan saat mengambil data Task",
         error: error.message,
      });
   }
});

router.get('/task/:id', authenticateToken, async (req, res) => {
   const id = req.params.id;
   try {
      const task = await getTaskById(id);
      res.status(200).json({
         data: task,
         message: "Task berhasil ditemukan",
      });
   } catch (error) {
      res.status(404).json({
         message: "Terjadi kesalahan saat mengambil data Task",
         error: error.message,
      });
   }
});


// Endpoint untuk menambahkan Task baru
router.post('/task', authenticateToken, async (req, res) => {
   const userId = req.user.userId
   console.log(userId);
   const newTaskData = req.body;
   console.log(newTaskData);
   

   try {
      const newTask = await insertTaskData(userId, newTaskData);
      res.status(201).json({
         data: newTask,
         message: "Task berhasil ditambahkan",
      });
   } catch (error) {
      res.status(400).json({
         message: "Terjadi kesalahan saat menambahkan Task",
         error: error.message,
      });
   }
});



router.patch('/task/:id', authenticateToken, async (req, res) => {
   const userId = req.user.userId
   const id = req.params.id
   const newTaskData = req.body;

   console.log(newTaskData);
   try {
      const updatedTask = await updateTaskData(id, userId, newTaskData);
      res.status(200).json({
         data: updatedTask,
         message: "Task berhasil diperbarui",
      });
   } catch (error) {
      res.status(400).json({
         error: error.message,
      });
   }
});

router.delete('/task/:id', authenticateToken, async (req, res) => {
   const id = req.params.id;
   const userId = req.user.userId

   try {
      const deletedTask = await deleteTaskData(id, userId);
      res.status(200).json({
         message: "Task berhasil dihapus",
      });
   } catch (error) {
      res.status(404).json({
         message: "Terjadi kesalahan saat menghapus Task",
         error: error.message,
      });
   }
});

module.exports = router;
