const { createTask, deleteTask, findAllTasks, findTaskById, updateTask, findTaskByTitle } = require('./task.repository.js');
const getTask = async (userId) => {
   return await findAllTasks(userId)
};


const getTaskById = async (id, userId) => {

   const taskId = await findTaskById(id, userId)
   if (!taskId) {
      throw new Error("Task tidak ditemukan")
   }

   return taskId
}

const getTaskByTitle = async (taskTitle) => {
   const task = await findTaskByTitle(taskTitle)
   if (!task) {
      throw new Error("Task tidak ditemukan")
   }
   return task
}


const insertTaskData = async (userId, newTaskData) => {

   if (!newTaskData.title || !newTaskData.description) {
      throw new Error("Semua Field harus diisi")
   }

   const titleExist = await findTaskByTitle( newTaskData.title)
   if (titleExist) {
      throw new Error("title sudah terdaftar")
   }

   const task = await createTask(userId, newTaskData)
   return task
}

const updateTaskData = async (id, userId, newTaskData) => {

   const task = await updateTask(id, userId, newTaskData)

   return task
}

const deleteTaskData = async (id, userId) => {

   const taskId = await getTaskById(id, userId)
   if (!taskId) {
      throw new Error("Task tidak ditemukan")
   }
   return await deleteTask(id)
}

module.exports = {
   getTask,
   getTaskById,
   getTaskByTitle,
   insertTaskData,
   updateTaskData,
   deleteTaskData
}