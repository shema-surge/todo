const {Router} = require('express')
const path = require('path')

const router = Router()

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/../assets/html/index.html'))
})

router.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'/../assets/html/signup.html'))
})

router.get('/task',(req,res)=>{
    res.sendFile(path.join(__dirname,'/../assets/html/task.html'))
})

module.exports = router