const router = require('express').Router()
const bcrypt = require('bcryptjs')
const user = require('../models/user')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { registrationValidation, loginValidation } = require('../validation')


//register part
router.post('/registration', async (req, res) => {
    //validating the user
    const { error } = registrationValidation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }

    //check the database for the same email
    const exsistEmail = await User.findOne({email: req.body.email})
    if(exsistEmail)
        return res.status(400).send('Email already exsist!')

    //encrypting the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create a new user
        const user = new User({
            email: req.body.email,
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            //password: hashedPassword
            password: req.body.password
        })
        try {
            const savedUser = await user.save()
            res.send({user: user._id})
        } catch (error) {
            res.status(400).send('error')
        }

})


//login part
router.post('/login', async (req, res) => {
    //validation
    const { error } = loginValidation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }

    //check if the user is registered or not
    const exsistUser = await user.findOne({userId: req.body.userId})
    //console.log(exsistUser)
    //console.log(exsistUser.password)
    if(!exsistUser)
        return res.status(400).send('User does not exsist!')

       
//encrypted password match
    // const corrPass = bcrypt.compare(req.body.password, exsistUser.password,()=>{
    //     if(){
            
    //         return res.status(400).send('Ok')
    //     }
    //     else{
    //         console.log(exsistUser.password)
    //         res.send("Not OK")}
        
    // })

    //without encryption
    if(req.body.password !== exsistUser.password){
        res.send("Incorrect Password!")
    }
    else{
       // console.log(exsistUser.password)
       //create token
       let Secret_Token = 'strongpasdgdsgfdsfdssword'
       const token = jwt.sign({_id: exsistUser._id}, Secret_Token)
        res.header('auth-token', token).send(token)
    }
})

module.exports = router