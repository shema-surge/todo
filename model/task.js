const {Schema,model, default: mongoose} = require('mongoose')

const taskSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    due_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['Completed','Pending','Exceeded Deadline'],
        default:'Pending'
    }
})

module.exports = model('task',taskSchema)