const Joi = require("joi");

const publicationSchema = Joi.object({
    schoolId: Joi.number().required(),
    grade: Joi.number().min(0).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    shift: Joi.string().valid("MORNING", "AFTERNOON", "FULL_DAY").required(),
    status: Joi.string().valid("OPEN", "FILLED", "CANCELLED").required(),
});

module.exports = publicationSchema;