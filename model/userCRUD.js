const user = require('./user')

function getAllUsers(){
    return user.find()
}

function getUser(obj){
    return user.findOne(obj)
}

function createUser(obj){
   return user.create(obj)
}

function editUser(id,obj){
    return user.findByIdAndUpdate(id,obj,{new:true})
}

function deleteUser(id){
    return user.deleteOne({_id:id})
}

module.exports = {getAllUsers,getUser,createUser,editUser,deleteUser}