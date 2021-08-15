const Joi = require('joi');

const authRegisterSchema = Joi.object({
    first_name: Joi.string().min(1).max(255).required(),
    last_name: Joi.string().min(1).max(255).required(),
    username: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

module.exports = {
    authRegisterSchema
}
