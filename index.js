const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cors({
    origin:'*'
}))

app.use(cookieParser())

app.set('view-engine','ejs')

app.use(express.static(__dirname+'/assets'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',require('./controllers/main'))
app.use('/',require('./controllers/user'))
app.use('/',require('./controllers/task'))

mongoose.connect(`mongodb://localhost:27017/mydb`,(err)=>{
    if(err) console.error(err)
    console.log("Connected to Mongo")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`)
})