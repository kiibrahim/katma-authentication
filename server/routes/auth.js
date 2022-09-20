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
        console.log(error.details[0].message)
    }
    else {
        const exsistEmail = await User.findOne({ email: req.body.email })
        if (exsistEmail) {
            return res.status(400).send('Email already exsist!')
            console.log('Email already exsist!')
        }

        //encrypting the password
        //const salt = await bcrypt.genSalt(10)
        //onst hashedPassword = await bcrypt.hash(req.body.password, salt)

        //create a new user
        else {
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
                res.send({ user: user._id })
                console.log({ user: user._id })
            } catch (error) {
                res.status(400).send(error)
                console.log(error)
            }
        }
    }
    //check the database for the same email



})


//login part
router.post('/login', async (req, res) => {
    //validation
    const { error } = loginValidation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    else {
        //check if the user is registered or not
        const exsistUser = await user.findOne({ userId: req.body.userId })
        //console.log(exsistUser)
        //console.log(exsistUser.password)
        if (!exsistUser)
            return res.status(400).send('User does not exsist!')
        else {
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
            if (req.body.password !== exsistUser.password) {
                res.send("Incorrect Password!")
            }
            else {
                // console.log(exsistUser.password)
                //create token
                let Secret_Token = 'strongpasdgdsgfdsfdssword'
                const token = jwt.sign({ _id: exsistUser._id }, Secret_Token)
                res.status(200).header('auth-token', token).send(token)
            }
        }
    }




})

router.get('/user',(req, res)=>{
    let token = req.headers.token
    let Secret_Token = 'strongpasdgdsgfdsfdssword'
    jwt.verify(token,Secret_Token ,(error, granted)=>{
        if(error) return res.send(error)

       User.findOne({_id: granted._id},(err, user)=>{
        if(error) return res.send(error)

        return res.status(200).json({
            user:{
                lastName: user.lastName
            }
        })
       })
    })
})
module.exports = router