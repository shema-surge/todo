const {getUser} = require('../model/userCRUD')
const jwt = require('jsonwebtoken')


function verifyToken(req,res,next){
    try{
        const token = req.cookies['auth-token']
        if(!token) throw new Error('Not Authenticated')
        const user = jwt.verify(token,process.env.JWT_SECRET)
        if(!getUser({_id:user.id})) throw new Error('user does not exist')
        req.user = user.id
        next()
    }catch(err){
        res.render('login.ejs',{err:null})
    }
}

function verifyTokenRest(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        if(!token) throw new Error('Not Authenticated')
        const user = jwt.verify(token,process.env.JWT_SECRET)
        if(!getUser({_id:user.id})) throw new Error('user does not exist')
        req.user = user.id
        next()
    }catch(err){
        res.json({message:err.message})
    }
}

module.exports = {verifyToken,verifyTokenRest}