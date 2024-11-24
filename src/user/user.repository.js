const { prisma } = require('../db/index.js');



const findAllUsers = async () => {
   return await prisma.user.findMany()
}

const findUserById = async (id) => {
   return await prisma.user.findUnique({
      where: {
         id
      }
   })
}

const findUserByEmail = async (email) => {
   return await prisma.user.findUnique({
      where: {
         email
      }
   })
}

const findUserByName = async (username) => {
   return await prisma.user.findUnique({
      where: {
         username,
      },
   });
};


const createUser = async (newUserData) => {
   return await prisma.user.create({
      data: {
         username: newUserData.username,
         email: newUserData.email,
         password: newUserData.password
      }
   })
}

const updateUser = async (id, newUserData) => {
   return await prisma.user.update({
      where: {
         id
      },
      data: {
         username: newUserData.username,
         email: newUserData.email,
         password: newUserData.password
      }
   })
}

const deleteUser = async (id) => {
   return await prisma.user.delete({
      where: {
         id
      }
   })
}

module.exports = { findAllUsers, findUserById, findUserByEmail, findUserByName, createUser, updateUser, deleteUser }