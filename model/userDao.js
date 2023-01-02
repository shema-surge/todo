const user = require('./user')

function getAllusers(){
    return user.find()
}

function getOneuser(id){
    return user.findById(id)
}

function createuser(obj){
   return user.create(obj)
}

function edituser(id,obj){
    return user.findByIdAndUpdate(id,obj,{new:true})
}

function deleteuser(id){
    return user.deleteOne({_id:id})
}

module.exports = {getAllusers,getOneuser,createuser,edituser,deleteuser}