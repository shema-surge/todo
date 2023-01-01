const task = require('./task')

function getAllTasks(){
    return task.find()
}

function getOneTask(id){
    return task.findById(id)
}

function getPendingTasks(id){
    return task.find({status:"Pending"})
}

function getCompletedTasks(id){
    return task.find({status:"Completed"})
}

function addTask(obj){
   return task.create(obj)
}

function editTask(id,obj){
    return task.findByIdAndUpdate(id,obj,{new:true})
}

function deleteTask(id){
    task.findByIdAndDelete(id)
}

module.exports = {getAllTasks,getOneTask,addTask,editTask,deleteTask}