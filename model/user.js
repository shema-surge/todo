const {Schema,model, default: mongoose} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({

    name:{
        type:String,
        min:[2,"Too short"],
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
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

module.exports = model('user',userSchema)