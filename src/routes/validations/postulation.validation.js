const Joi = require("joi");

const createPostulationSchema = Joi.object({
    teacherId: Joi.string().required(),
    publicationId: Joi.string().required(),
    createdAt: Joi.date().required(),
    appliesToAllDays:Joi.boolean().required()
});

const updatePostulationSchema = Joi.object({
    teacherId: Joi.string().required(),
    publicationId: Joi.string().required(),
    status: Joi.string().valid("PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN").required(),
    appliesToAllDays:Joi.boolean().required(),
    createdAt: Joi.date().required(),
});

module.exports = {
    createPostulationSchema,
    updatePostulationSchema,
};