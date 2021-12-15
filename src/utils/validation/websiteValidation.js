const Joi = require('joi');

const websiteRegisterSchema = Joi.object({
  url: Joi.string().required(),
});

const websiteGetScoreSchema = Joi.object({
  url: Joi.string().required(),
});

const websiteScoreByIdSchema = Joi.number().integer().min(1).max(2147483647);

module.exports = {
  websiteRegisterSchema,
  websiteGetScoreSchema,
  websiteScoreByIdSchema,
};
