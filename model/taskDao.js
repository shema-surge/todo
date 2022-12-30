const task = require('./task')

function getAllTasks(){
    return task.find();
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

function addTask(name,description,due_date){
    task.create({name,description,due_date,status:"Pending"})
}

function editTask(id,name,description,due_date){
    task.findByIdAndUpdate(id,{name,description,due_date})
}

function completeTask(id,name,description,due_date){
    task.findByIdAndUpdate(id,{status:"Completed"})
}

function deleteTask(id){
    task.findByIdAndDelete(id)
}

module.exports = {getAllTasks,getOneTask,editTask,completeTask,deleteTask}