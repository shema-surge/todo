const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

app.use(cors({
    origin:'*'
}))

app.use(express.static(__dirname+'/assets'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',require('./controllers/mainRoutes'))
app.use('/',require('./controllers/userRoutes'))
app.use('/',require('./controllers/taskRoutes'))

mongoose.connect(`mongodb://localhost:27017/mydb`,(err)=>{
    if(err) console.error(err)
    console.log("Connected to Mongo")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`)
})