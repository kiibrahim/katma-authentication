const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true,
        min: 6
    
    },
    firstName:{
        type: String,
        required: true,
        max: 20
    },
    lastName:{
        type: String,
        required: true,
        max:20
    },
    password:{
        type: String,
        required: true,
        min:6
    }
})

module.exports = mongoose.model('User', userSchema)