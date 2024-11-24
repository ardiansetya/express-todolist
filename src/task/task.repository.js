const { prisma } = require('../db/index.js');



const findAllTasks = async () => {
   return await prisma.task.findMany()
}

const findTaskById = async (id) => {
   const task= await prisma.task.findUnique({
      where: {
         id
      }
   })
   return task
}

const findTaskByCompleted = async (compeleted) => {
   const task = await prisma.task.findUnique({
      where: {
         compeleted
      }
   })
   return task
}

const findTaskByTitle = async (title) => {
   const task = await prisma.task.findFirst({
      where: {
         title,
      },
   });
   return task
};


const createTask = async (newTaskData) => {
   const task = await prisma.task.create({
      data: {
         title: newTaskData.title,
         description: newTaskData.description,
         userId: newTaskData.userId
      }
   })
   return task
}

const updateTask = async (id, newTaskData) => {
   const task = await prisma.task.update({
      where: {
         id
      },
      data: {
         title: newTaskData.title,
         description: newTaskData.description,
         completed: newTaskData.completed ?? false ,
         userId: newTaskData.userId
      }
   })
   return task
}

const deleteTask = async (id) => {
   return await prisma.task.delete({
      where: {
         id
      }
   })
}

module.exports = { findAllTasks, findTaskById, findTaskByTitle, findTaskByCompleted, createTask, updateTask, deleteTask }