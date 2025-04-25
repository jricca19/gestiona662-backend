const Joi = require("joi");

const createPostulationSchema = Joi.object({
    teacherId: Joi.string().required(),
    publicationId: Joi.string().required(),
    createdAt: Joi.date().required(),
});

const updatePostulationSchema = Joi.object({
    teacherId: Joi.string().required(),
    publicationId: Joi.string().required(),
    status: Joi.string().valid("PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN").required(),
    createdAt: Joi.date().required(),
});

module.exports = {
    createPostulationSchema,
    updatePostulationSchema,
};