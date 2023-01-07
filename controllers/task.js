const {Router} = require('express')
const {getAllTasks,getOneTask,addTask,editTask,deleteTask} = require('../model/taskCRUD')
const path = require('path')
const { verifyToken,verifyTokenRest } = require('./middleware')

const router = Router()

router.get('/allTasks',verifyToken,async (req,res,next)=>{
    try{
        res.json(await getAllTasks({user:req.user}))
    }catch(err){
        next(err)
    }
})

router.get('/allTasksRest',verifyTokenRest,async (req,res,next)=>{
    try{
        res.json(await getAllTasks({user:req.user}))
    }catch(err){
        res.json(err)
    }
})


router.get('/task/:id',verifyToken,async (req,res,next)=>{
    try{
        if(!req.params || !req.params.id) throw new Error("Missing task ID")
        res.send(await getOneTask(req.params.id))
    }catch(err){
        res.status(400).send({message:err.message})
    }
})

router.post('/editTask/:id',verifyToken,async (req,res,next)=>{
    try{
        if(!req.params || !req.params.id) throw new Error("Missing task ID")
        if(!req.body || !req.body.name || !req.body.description || !req.body.due_date) throw new Error("Missing update data")
        const task = await getOneTask(req.params.id)
        const obj={
            name:req.body.name,
            description:req.body.description,
            due_date:req.body.due_date
        }
        if(new Date().getTime()>new Date(req.body.due_date).getTime()) throw new Error("Invalid Date")
        
        res.send(await editTask(req.params.id,obj))
    }catch(err){
        res.status(400).send({message:err.message})
    }
})

router.post('/completeTask/:id',verifyToken,async (req,res,next)=>{
    try{
        if(!req.params || !req.params.id) throw new Error("Missing task ID")
        res.send(await editTask(req.params.id,{status:"Completed"}))
    }catch(err){
        res.status(400).send({message:err.message})
    }
})

router.post('/completeTaskRest/:id',verifyTokenRest,async (req,res,next)=>{
    try{
        if(!req.params || !req.params.id) throw new Error("Missing task ID")
        res.send(await editTask(req.params.id,{status:"Completed"}))
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


router.post('/addTask',verifyToken,async (req,res,next)=>{
    try{
        if(!req.body || !req.body.name || !req.body.description || !req.body.due_date){
            throw new Error("Please provide all task details")
        } 
        const obj = {
            name:req.body.name,
            description:req.body.description,
            due_date:req.body.due_date,
            user:req.user
        }
        if(new Date().getTime()>new Date(obj.due_date).getTime()) throw new Error("Invalid Date")
        res.send(await addTask(obj))
    }catch(err){
        res.status(400).send({message:err.message})
    }
})

router.post('/addTaskRest',verifyTokenRest,async (req,res,next)=>{
    try{
        if(!req.body || !req.body.name || !req.body.description || !req.body.due_date) throw new Error("Missing task data")
        const obj = {
            name:req.body.name,
            description:req.body.description,
            due_date:new Date(req.body.due_date),
            user:req.user
        }
        if(new Date().getTime()>new Date(obj.due_date).getTime()) throw new Error("Invalid Date")
        res.json(await addTask(obj))
    }catch(err){
        res.json({message:err.message})
    }
})



router.get('/delete/:id',verifyToken,async (req,res,next)=>{
    try{
        if(!req.params.id || !req.params.id) throw new Error("Missing task ID")
        await deleteTask(req.params.id)
        res.send({success:true})
    }catch(err){
        console.error(err)
    }
})


module.exports = router