const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose =  require('mongoose')
const Joi = require('@hapi/joi')

const auth = require('./routes/auth')
const postauth = require('./routes/posts')


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



mongoose.connect('mongodb+srv://ibu:Cy5haYMXzqmSXn1V@cluster0.4ft9nth.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true},()=>{
    console.log("DB Connected!")
})


app.use(express.json())
app.use('/api',auth)
app.use('/api/posts',postauth)
app.use('/',auth)



app.listen(9000,()=>{
    console.log("Connected @9000")
})