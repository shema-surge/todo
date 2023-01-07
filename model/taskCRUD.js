const task = require('./task')

function getAllTasks(obj){
    return task.find(obj)
}

function getOneTask(id){
    return task.findById(id)
}

function addTask(obj){
   return task.create(obj)
}

function editTask(id,obj){
    return task.findByIdAndUpdate(id,obj,{new:true})
}

function deleteTask(id){
    return task.deleteOne({_id:id})
}

module.exports = {getAllTasks,getOneTask,addTask,editTask,deleteTask}