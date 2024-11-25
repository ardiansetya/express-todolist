const { prisma } = require('../db/index.js');



const findAllTasks = async (userId) => {
   const tasks = await prisma.task.findMany({
      where: {
         userId: userId,
      },
   });
   return tasks
}

const findTaskById = async (id, userId) => {
   const task= await prisma.task.findUnique({
      where: {
         id,
         userId
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


const createTask = async (userId,newTaskData) => {
   const task = await prisma.task.create({
      data: {
         title: newTaskData.title,
         description: newTaskData.description,
         userId: newTaskData.userId?? userId
      }
   })
   return task
}

const updateTask = async (id, userId, newTaskData) => {
   const task = await prisma.task.update({
      where: {
         id,
         userId
      },
      data: {
         title: newTaskData.title,
         description: newTaskData.description,
         completed: newTaskData.completed ?? false ,
         userId: newTaskData.userId ?? userId
      }
   })
   return task
}

const deleteTask = async (id, userId) => {
   return await prisma.task.delete({
      where: {
         id,
         userId
      }
   })
}

module.exports = { findAllTasks, findTaskById, findTaskByTitle, findTaskByCompleted, createTask, updateTask, deleteTask }