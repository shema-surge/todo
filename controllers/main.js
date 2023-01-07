const {Router} = require('express')
const { getUser } = require('../model/userCRUD')
const { verifyToken } = require('./middleware')

const router = Router()

router.get('/',(req,res)=>{
    res.render('login.ejs',{err:null})
})

router.get('/signup',(req,res)=>{
    res.render('signup.ejs',{err:null})
})

router.get('/task',verifyToken,async (req,res)=>{
    const user = await getUser({_id:req.user})
    console.log(user.username)
    res.render('task.ejs',{username:user.username})
})

module.exports = router