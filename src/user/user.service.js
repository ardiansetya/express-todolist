const { createUser, deleteUser, findAllUsers, findUserById, updateUser } = require('./user.repository.js');
 const getUser = async () => {
   return await findAllUsers()
};


 const getUserById = async (id) => {

    const userId = await findUserById(id)
    if (!userId) {
       throw new Error("user tidak ditemukan")
    }

   return userId
}

 const insertUserData = async (newUserData) => {
   const user = await createUser(newUserData)

   const emailExist = await getUserByEmail(user.email)
   if (emailExist) {
      return new Error("email sudah terdaftar")
   }
   return user
}

 const updateUserData = async (id, newUserData) => {

    const userId = await getUserById(id)

   if (id !== userId) {
      throw new Error("user tidak ditemukan")
   }

   return await updateUser(id, newUserData)
}

 const deleteUserData = async (id) => {

   if (!id) {
      return new Error("user tidak ditemukan")
   }
   return await deleteUser(id)
}

module.exports = {
   getUser,
   getUserById,
   insertUserData,
   updateUserData,
   deleteUserData
}