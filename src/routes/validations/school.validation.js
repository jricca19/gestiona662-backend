const Joi = require("joi");

const schoolSchema = Joi.object({
    schoolNumber: Joi.number().required(),
    departmentId: Joi.string().required(),
    cityName: Joi.string().required(),
    address: Joi.string().required()
});

module.exports = schoolSchema;