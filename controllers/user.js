const path = require('path')
const jwt = require('jsonwebtoken')
const {Router} = require('express')
const {compare} = require('bcrypt')
require('dotenv').config()

const {createUser, getUser} = require('../model/userCRUD')

const router = Router()

router.post('/login',async(req,res,next)=>{
    try{

        if(!req.body || !req.body.username || !req.body.password) throw new Error("Missing Data")
        let user = await getUser({username:req.body.username})
        if(!user) throw new Error("Bad credentials")
        if(!await compare(req.body.password,user.password))  throw new Error("Bad Credentials")
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.cookie('auth-token',token,{maxAge:60*60*1000,httpOnly:true})
        res.redirect('/task')

    }catch(err){
        console.log(err)
        res.render('login.ejs',{err:err})
    }
})

router.post('/loginRest',async(req,res,next)=>{
    try{
        
        if(!req.body || !req.body.username || !req.body.password) throw new Error("Missing Data")
        let user = await getUser({username:req.body.username})
        if(!user) throw new Error("Bad credentials")
        if(!await compare(req.body.password,user.password))  throw new Error("Bad Credentials")
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30m"})
        res.json({token:token})

    }catch(err){
        res.json(err)
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

        if(await getUser({username:obj.username})) throw new Error("Username already exists")
        if(await getUser({email:obj.email})) throw new Error("Email already exists")

        await createUser(obj)
        res.redirect('/')
    }catch(err){
        res.render('signup.ejs',{err:err})
    }
})


router.get('/logout',(req,res)=>{
    res.clearCookie('auth-token')
    res.redirect('/')
})


module.exports = router