const {Router} = require('express')
const {getAllTasks,getOneTask,addTask,editTask,deleteTask} = require('../model/taskDao')
const path = require('path')

const router = Router()

router.get('/allTasks',async (req,res,next)=>{
    try{
        res.send(await getAllTasks())
        console.log(await getAllTasks())
    }catch(err){
        next(err)
    }
})

router.get('/task/:id',async (req,res,next)=>{
    try{
        if(!req.params || !req.params.id) throw new Error("Missing task ID")
        res.send(await getOneTask(req.params.id))
    }catch(err){
        next(err)
    }
})

router.post('/editTask/:id',async (req,res,next)=>{
    try{
        if(!req.params || !req.params.id) throw new Error("Missing task ID")
        if(!req.body) throw new Error("Missing update data")
        console.log(req.body)
        res.send(await editTask(req.params.id,req.body))
    }catch(err){
        next(err)
    }
})


router.post('/addTask',async (req,res,next)=>{
    try{
        const obj = {
            name:req.body.name,
            description:req.body.description,
            due_date:req.body.due_date
        }
        res.send(await addTask(obj))
        //console.log(obj)
    }catch(err){
        console.error(err)
    }
})

router.get('/delete/:id',async (req,res,next)=>{
    try{
        if(!req.params.id || !req.params.id) throw new Error("Missing task ID")
        res.send(await deleteTask(req.params.id))
    }catch(err){
        console.error(err)
    }
})


module.exports = router