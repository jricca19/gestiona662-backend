const Joi = require("joi");

const teacherSchema=Joi.object({
    userId:Joi.string().required(),
    ci:Joi.string().min(8).max(8).required(),
    address:Joi.string().required(),
    yearsExperience:Joi.number().required(),
    gradeExperience:Joi.number().required(),
    preferredShifts: Joi.string().valid("MORNING", "AFTERNOON", "FULL_DAY").required(),
    averageRating: Joi.number().min(1).max(10).required()
});

module.exports=teacherSchema;