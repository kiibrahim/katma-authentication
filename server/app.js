const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose =  require('mongoose')
const dotenv = require('dotenv')
const Joi = require('@hapi/joi')

const auth = require('./routes/auth')
const postauth = require('./routes/posts')


const app = express()
app.use(cors())
//app.use(bodyParser.json())


dotenv.config()

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4', {useNewUrlParser: true},()=>{
    console.log("DB Connected!")
})


app.use(express.json())
app.use('/api',auth)
app.use('/api/posts',postauth)



app.listen(9000,()=>{
    console.log("Connected @9000")
})