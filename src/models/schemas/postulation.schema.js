const Joi = require("joi");

const createPostulationSchema = Joi.object({
    teacherId: Joi.number().required(),
    postulationId: Joi.number().required(),
    createdAt: Joi.date().required(),
});

const updatePostulationSchema = Joi.object({
    teacherId: Joi.number().required(),
    postulationId: Joi.number().required(),
    status: Joi.string().valid("PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN").required(),
    createdAt: Joi.date().required(),
});

module.exports = {
    createPostulationSchema,
    updatePostulationSchema,
};