const Joi = require("joi");

const postulationDaySchema = Joi.object({
    postulationId: Joi.string().required(),
    substitutionDayId: Joi.string().required(),
});

module.exports = postulationDaySchema;