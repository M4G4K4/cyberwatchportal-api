const Joi = require('joi');

const websiteRegisterSchema = Joi.object({
    url: Joi.string().required()
});

const websiteGetScoreSchema = Joi.object({
    url: Joi.string().required()
});

module.exports = {
    websiteRegisterSchema,
    websiteGetScoreSchema
}
