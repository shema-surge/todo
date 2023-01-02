const {Schema,model, default: mongoose} = require('mongoose')

const userSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }

})

module.exports = model('task',userSchema)