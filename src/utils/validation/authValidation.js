const Joi = require('joi');

const authRegisterSchema = Joi.object({
    first_name: Joi.string().min(1).max(255).required(),
    last_name: Joi.string().min(1).max(255).required(),
    username: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const authLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const authRefreshSchema = Joi.object({
    refreshToken: Joi.string().required()
});


module.exports = {
    authRegisterSchema,
    authLoginSchema,
    authRefreshSchema
}
