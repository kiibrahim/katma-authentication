const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.header('auth-token')
    let Secret_Token = 'strongpasdgdsgfdsfdssword'
    if(!token) {
        return res.status(401).send("Access Denied!")
    }
    try{
        const verified = jwt.verify(token, Secret_Token)
        req.user = verified
        next()
    }
    catch{
        res.status(400).send("Invalid TOken")
    }
}