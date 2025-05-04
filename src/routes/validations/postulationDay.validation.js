const Joi = require("joi");

const postulationDaySchema = Joi.object({
    postulationId: Joi.string().required(),
    publicationDayId: Joi.string().required(),
});

module.exports = postulationDaySchema;