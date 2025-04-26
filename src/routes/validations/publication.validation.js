const Joi = require("joi");

const createPublicationSchema = Joi.object({
    schoolId: Joi.string().required(),
    grade: Joi.number().min(0).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    shift: Joi.string().valid("MORNING", "AFTERNOON", "FULL_DAY").required(),
});

const updatePublicationSchema = Joi.object({
    schoolId: Joi.string().required(),
    grade: Joi.number().min(0).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    shift: Joi.string().valid("MORNING", "AFTERNOON", "FULL_DAY").required(),
    status: Joi.string().valid("OPEN", "FILLED", "CANCELLED", "EXPIRED").required(),
});

module.exports = {
    createPublicationSchema,
    updatePublicationSchema,
};