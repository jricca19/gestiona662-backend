const Joi = require("joi");

const substitutionDaySchema=Joi.object({
    publicationId:Joi.string().required(),
    date:Joi.date().required(),
    status:Joi.string().valid("AVAILABLE", "ASSIGNED", "CANCELLED", "EXPIRED").required(),
    assignedTeacherId:Joi.string().required()
});

module.exports=substitutionDaySchema;