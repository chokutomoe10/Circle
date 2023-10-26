import Joi = require("joi");

export const createThreadSchema = Joi.object().keys({
    content: Joi.string().required(),
    image: Joi.string().required(),
})

export const updatedThread = Joi.object().keys({
    content: Joi.string(),
    image: Joi.string(),
})