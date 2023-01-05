const {Router} = require('express')
const {compare} = require('bcrypt')
const path = require('path')
const {createUser, getOneUser} = require('../model/userDao')

const router = Router()

router.post('/login',async(req,res,next)=>{
    try{
        if(!req.body || !req.body.username || !req.body.password) throw new Error("Missing Data")
        let user = await getOneUser({username:req.body.username})
        if(!user) throw new Error("Bad credentials")
        if(!await compare(req.body.password,user.password))  throw new Error("Bad Credentials")
        res.redirect('/task')
    }catch(err){
        console.log(err)
    }
})

router.post('/create',async (req,res,next)=>{
    try{
        if(!req.body || !req.body.name || !req.body.username || !req.body.email || !req.body.password) throw new Error("Missing Data")
        const obj={
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        }
        await createUser(obj)
        res.redirect('/')
    }catch(err){
        console.log(err)
    }
})


module.exports = router