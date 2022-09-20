const Joi = require('@hapi/joi')
const registrationValidation = (data)=>{ 
    const registrationSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        userId: Joi.string().min(6).required(),
        firstName: Joi.string().min(6).required(),
        lastName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
})
return registrationSchema.validate(data)
}
const loginValidation = (data)=>{
    const loginSchema = Joi.object({
    userId: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
})
return loginSchema.validate(data)
}

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation