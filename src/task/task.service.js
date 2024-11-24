const { createTask, deleteTask, findAllTasks, findTaskById, updateTask, findTaskByTitle } = require('./task.repository.js');
const getTask = async () => {
   return await findAllTasks()
};


const getTaskById = async (id) => {

   const taskId = await findTaskById(id)
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


const insertTaskData = async (newTaskData) => {

   if (!newTaskData.title || !newTaskData.description || !newTaskData.userId) {
      throw new Error("Semua Field harus diisi")
   }

   const titleExist = await findTaskByTitle(newTaskData.title)
   if (titleExist) {
      throw new Error("title sudah terdaftar")
   }

   const task = await createTask(newTaskData)
   return task
}








const updateTaskData = async (id, newTaskData) => {

   const task = await updateTask(id, newTaskData)

   return task
}

const deleteTaskData = async (id) => {

   const taskId = await findTaskById(id)
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