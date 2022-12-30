const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

app.use(cors({
    origin:'*'
}))

app.set('view-engine','ejs')

app.use(express.static(__dirname+'/assets'))

app.use(express.urlencoded({extended:false}))


app.get('/',(res,req)=>{
    res.sendFile(__dirname+'/views/index.html')
})

//app.use('/',require('./controllers/routes'))

mongoose.connect(`mongodb://localhost:27017/mydb`,(err)=>{
    if(err) console.error(err)
    console.log("Connected to Mongo")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`)
})