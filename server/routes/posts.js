const router = require('express').Router()
const verifyToken = require('./verifyToken')

router.get('/',verifyToken,(req, res)=>{
    res.send({
        posts:{
            Name: "Post",
            Functiom: "Check verification"
        }
    })
})

module.exports = router