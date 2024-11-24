const express = require('express');
const { getTask, insertTaskData, deleteTaskData, updateTaskData, getTaskById, getTaskByName } = require('./task.service');

const router = express.Router();

// Endpoint untuk mendapatkan semua Task
router.get('/tasks', async (req, res) => {
   try {
      const allTasks = await getTask();
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

router.get('/task/:id', async (req, res) => {
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
router.post('/task', async (req, res) => {
   const newTaskData = req.body;
   console.log(newTaskData);
   

   try {
      const newTask = await insertTaskData(newTaskData);
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



router.patch('/task/:id', async (req, res) => {
   const id = req.params.id;
   const newTaskData = req.body;

   console.log(newTaskData);
   try {
      const updatedTask = await updateTaskData(id, newTaskData);
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

router.delete('/task/:id', async (req, res) => {
   const id = req.params.id;

   try {
      const deletedTask = await deleteTaskData(id);
      res.status(200).json({
         data: deletedTask,
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
