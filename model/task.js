const {Schema,model, default: mongoose} = require('mongoose')
const taskSchema = new Schema({

    name:{
        type:String,
        required:[true,"Name is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    due_date:{
        type:Date,
        required:[true,"Due date is required"]
    },
    status:{
        type:String,
        enum:['Completed','Pending'],
        default:'Pending'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }

})
module.exports = model('task',taskSchema)