const Joi = require("joi");

const createPublicationSchema = Joi.object({
    schoolId: Joi.string().required(),
    grade: Joi.number().min(0).max(6).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    shift: Joi.string().valid("MORNING", "AFTERNOON", "FULL_DAY").required()
});

const updatePublicationSchema = Joi.object({
    schoolId: Joi.string().required(),
    grade: Joi.number().min(0).max(6).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    shift: Joi.string().valid("MORNING", "AFTERNOON", "FULL_DAY").required(),
    status: Joi.string().valid("OPEN", "FILLED", "CANCELLED", "EXPIRED").required(),
});

const publicationDaySchema=Joi.object({
    date:Joi.date().required(),
    status:Joi.string().valid("AVAILABLE", "ASSIGNED", "CANCELLED", "EXPIRED").required(),
    assignedTeacherId:Joi.string()
});

module.exports = {
    createPublicationSchema,
    updatePublicationSchema,
    publicationDaySchema
};