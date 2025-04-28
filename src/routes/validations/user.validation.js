const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  ci: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  phoneNumber: Joi.string().pattern(/^\+\d{1,15}$/).required(),
  role: Joi.string().valid("TEACHER", "STAFF").required(),
  isEffectiveTeacher: Joi.boolean().optional(),
  teacherProfile: Joi.when("role", {
    is: "TEACHER",
    then: Joi.object({
      address: Joi.string().required(),
      graduationDate: Joi.date().required(),
      competitionNumber: Joi.number().required(),
      healthCertificateStatus: Joi.boolean().required(),
      criminalRecordDate: Joi.date().required(),
      law19889CertificateDate: Joi.date().required(),
      gradeExperience: Joi.array().items(Joi.string()).required(),
      preferredShifts: Joi.array().items(Joi.string().valid("MORNING", "AFTERNOON", "FULL_DAY")).required()
    }).required(),
    otherwise: Joi.forbidden(),
  }),
  staffProfile: Joi.when("role", {
    is: "STAFF",
    then: Joi.object({
      schoolId: Joi.string().required(),
      isCurrent: Joi.boolean().required(),
      assignedAt: Joi.date().required(),
    }).required(),
    otherwise: Joi.forbidden(),
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
