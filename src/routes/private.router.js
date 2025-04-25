const express = require("express");
const privateRouter = express.Router();

const {
    getPublicationsController,
    getPublicationController,
    postPublicationController,
    deletePublicationController,
    putPublicationController,
} = require("../controllers/publications.controller");

const {
    getSchoolsController,
    getSchoolController,
    postSchoolController,
    deleteSchoolController,
    putSchoolController,
} = require("../controllers/schools.controller");

const {
    getTeachersController,
    getTeacherController,
    postTeacherController,
    deleteTeacherController,
    putTeacherController,
} = require("../controllers/teachers.controller");

const {
    getPostulationsController,
    getPostulationController,
    postPostulationController,
    deletePostulationController,
    putPostulationController,
} = require("../controllers/postulations.controller");

const {
    getSchoolAdministratorsController,
    getSchoolAdministratorController,
    postSchoolAdministratorController,
    deleteSchoolAdministratorController,
    putSchoolAdministratorController,
} = require("../controllers/schoolAdministrators.controller");

const {
    getRatingsController,
    getRatingController,
    postRatingController,
    deleteRatingController,
    putRatingController,
} = require("../controllers/ratings.controller");

const {
    getPostulationDaysController,
    getPostulationDayController,
    postPostulationDayController,
    deletePostulationDayController,
    putPostulationDayController,
} = require("../controllers/postulationDays.controller");

const {
    getSubstitutionDaysController,
    getSubstitutionDayController,
    postSubstitutionDayController,
    deleteSubstitutionDayController,
    putSubstitutionDayController,
} = require("../controllers/substitutionDays.controller");

const payloadMiddleWare = require("../middlewares/payload.middleware");
const {createPublicationSchema, updatePublicationSchema} = require("./validations/publication.validation");
const SchoolSchema = require("./validations/school.validation");
const TeacherSchema = require("./validations/teacher.validation");
const {createPostulationSchema, updatePostulationSchema} = require("./validations/postulation.validation");
const SchoolAdministratorSchema = require("./validations/schoolAdministrator.validation");
const RatingSchema = require("./validations/rating.validation");
const PostulationDaySchema = require("./validations/postulationDay.validation");
const SubstitutionDaySchema = require("./validations/substitutionDay.validation");

privateRouter.get("/publications", getPublicationsController);
privateRouter.get("/publications/:id", getPublicationController);
privateRouter.post("/publications", payloadMiddleWare(createPublicationSchema), postPublicationController);
privateRouter.delete("/publications/:id", deletePublicationController);
privateRouter.put("/publications/:id", payloadMiddleWare(updatePublicationSchema), putPublicationController);

privateRouter.get("/postulations", getPostulationsController);
privateRouter.get("/postulations/:id", getPostulationController);
privateRouter.post("/postulations", payloadMiddleWare(createPostulationSchema), postPostulationController);
privateRouter.delete("/postulations/:id", deletePostulationController);
privateRouter.put("/postulations/:id", payloadMiddleWare(updatePostulationSchema), putPostulationController);

privateRouter.get("/schools", getSchoolsController);
privateRouter.get("/schools/:id", getSchoolController);
privateRouter.post("/schools", payloadMiddleWare(SchoolSchema), postSchoolController);
privateRouter.delete("/schools/:id", deleteSchoolController);
privateRouter.put("/schools/:id", payloadMiddleWare(SchoolSchema), putSchoolController);

privateRouter.get("/teachers", getTeachersController);
privateRouter.get("/teachers/:id", getTeacherController);
privateRouter.post("/teachers", payloadMiddleWare(TeacherSchema), postTeacherController);
privateRouter.delete("/teachers/:id", deleteTeacherController);
privateRouter.put("/teachers/:id", payloadMiddleWare(TeacherSchema), putTeacherController);

privateRouter.get("/schoolAdministrators", getSchoolAdministratorsController);
privateRouter.get("/schoolAdministrators/:id", getSchoolAdministratorController);
privateRouter.post("/schoolAdministrators", payloadMiddleWare(SchoolAdministratorSchema), postSchoolAdministratorController);
privateRouter.delete("/schoolAdministrators/:id", deleteSchoolAdministratorController);
privateRouter.put("/schoolAdministrators/:id", payloadMiddleWare(SchoolAdministratorSchema), putSchoolAdministratorController);

privateRouter.get("/ratings", getRatingsController);
privateRouter.get("/ratings/:id", getRatingController);
privateRouter.post("/ratings", payloadMiddleWare(RatingSchema), postRatingController);
privateRouter.delete("/ratings/:id", deleteRatingController);
privateRouter.put("/ratings/:id", payloadMiddleWare(RatingSchema), putRatingController);

privateRouter.get("/postulationDays", getPostulationDaysController);
privateRouter.get("/postulationDays/:id", getPostulationDayController);
privateRouter.post("/postulationDays", payloadMiddleWare(PostulationDaySchema), postPostulationDayController);
privateRouter.delete("/postulationDays/:id", deletePostulationDayController);
privateRouter.put("/postulationDays/:id", payloadMiddleWare(PostulationDaySchema), putPostulationDayController);

privateRouter.get("/substitutionDays", getSubstitutionDaysController);
privateRouter.get("/substitutionDays/:id", getSubstitutionDayController);
privateRouter.post("/substitutionDays", payloadMiddleWare(SubstitutionDaySchema), postSubstitutionDayController);
privateRouter.delete("/substitutionDays/:id", deleteSubstitutionDayController);
privateRouter.put("/substitutionDays/:id", payloadMiddleWare(SubstitutionDaySchema), putSubstitutionDayController);

module.exports = privateRouter;