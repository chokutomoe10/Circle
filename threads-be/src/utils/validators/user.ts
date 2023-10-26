import Joi = require("joi")

export const registerSchema = Joi.object().keys({
    full_name: Joi.string().required(),
    username: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
