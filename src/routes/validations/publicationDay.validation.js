const Joi = require("joi");

const publicationDaySchema=Joi.object({
    date:Joi.date().required(),
    status:Joi.string().valid("AVAILABLE", "ASSIGNED", "CANCELLED", "EXPIRED").required(),
    assignedTeacherId:Joi.string()
});

module.exports=publicationDaySchema;