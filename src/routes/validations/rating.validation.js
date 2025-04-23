const Joi = require("joi");

const ratingSchema=Joi.object({
    teacherId:Joi.string().required(),
    publicationId:Joi.string().required(),
    score:Joi.number().min(1).max(10).required(),
    comment:Joi.string().required(),
    createdAt:Joi.date().required()
});

module.exports=ratingSchema;