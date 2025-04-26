const Joi = require("joi");

const schoolAdministratorSchema=Joi.object({
    userId:Joi.number().required(),
    schoolId:Joi.number().required(),
    isCurrent:Joi.boolean().required(),
    assignedAt:Joi.date().required()
});

module.exports=schoolAdministratorSchema;