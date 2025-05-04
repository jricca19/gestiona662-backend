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
    getPostulationsController,
    getPostulationController,
    postPostulationController,
    deletePostulationController,
    putPostulationController,
} = require("../controllers/postulations.controller");

const {
    getRatingController,
    deleteRatingController,
    getRatingsByUserController,
    postRatingController,
} = require("../controllers/ratings.controller");

const {
    getPostulationDaysController,
    getPostulationDayController,
    postPostulationDayController,
    deletePostulationDayController,
    putPostulationDayController,
} = require("../controllers/postulationDays.controller");

const {
    getPublicationDaysController,
    getPublicationDayController,
    postPublicationDayController,
    deletePublicationDayController,
    putPublicationDayController,
} = require("../controllers/publicationDays.controller");

const { putTeacherProfile, putUserProfile } = require("../controllers/user.controller");

const payloadMiddleWare = require("../middlewares/payload.middleware");
const { createPublicationSchema, updatePublicationSchema } = require("./validations/publication.validation");
const { createPostulationSchema, updatePostulationSchema } = require("./validations/postulation.validation");
const PostulationDaySchema = require("./validations/postulationDay.validation");
const PublicationDaySchema = require("./validations/publicationDay.validation");
const { updateUserValidationSchema, updateTeacherValidationSchema } = require("./validations/user.validation");
const { ratingValidationSchema, ratingsValidationSchema } = require("./validations/rating.validation");
const roleMiddleware = require("../middlewares/role.middleware");
const { schoolValidationSchema, updateSchoolValidationSchema } = require("./validations/school.validation");

privateRouter.get("/publications", getPublicationsController);
privateRouter.get("/publications/:id", getPublicationController);
privateRouter.post("/publications", roleMiddleware("STAFF"), payloadMiddleWare(createPublicationSchema), postPublicationController);
privateRouter.delete("/publications/:id", deletePublicationController);
privateRouter.put("/publications/:id", payloadMiddleWare(updatePublicationSchema), putPublicationController);

privateRouter.get("/postulations", getPostulationsController);
privateRouter.get("/postulations/:id", getPostulationController);
privateRouter.post("/postulations", roleMiddleware("TEACHER"), payloadMiddleWare(createPostulationSchema), postPostulationController);
privateRouter.delete("/postulations/:id", deletePostulationController);
privateRouter.put("/postulations/:id", payloadMiddleWare(updatePostulationSchema), putPostulationController);

privateRouter.get("/schools", getSchoolsController);
privateRouter.get("/schools/:id", getSchoolController);
privateRouter.post("/schools", roleMiddleware("STAFF"), payloadMiddleWare(schoolValidationSchema), postSchoolController);
privateRouter.delete("/schools/:id", roleMiddleware("STAFF"), deleteSchoolController);
privateRouter.put("/schools/:id", roleMiddleware("STAFF"), payloadMiddleWare(updateSchoolValidationSchema), putSchoolController);

privateRouter.get("/ratings/user", payloadMiddleWare(ratingsValidationSchema), getRatingsByUserController);
privateRouter.get("/ratings/:id", getRatingController);
privateRouter.post("/ratings", payloadMiddleWare(ratingValidationSchema), postRatingController);
privateRouter.delete("/ratings/:id", deleteRatingController);

privateRouter.get("/postulationDays", getPostulationDaysController);
privateRouter.get("/postulationDays/:id", getPostulationDayController);
privateRouter.post("/postulationDays", payloadMiddleWare(PostulationDaySchema), postPostulationDayController);
privateRouter.delete("/postulationDays/:id", deletePostulationDayController);
privateRouter.put("/postulationDays/:id", payloadMiddleWare(PostulationDaySchema), putPostulationDayController);

privateRouter.get("/publicationDays", getPublicationDaysController);
privateRouter.get("/publicationDays/:id", getPublicationDayController);
privateRouter.post("/publicationDays", payloadMiddleWare(PublicationDaySchema), postPublicationDayController);
privateRouter.delete("/publicationDays/:id", deletePublicationDayController);
privateRouter.put("/publicationDays/:id", payloadMiddleWare(PublicationDaySchema), putPublicationDayController);

privateRouter.put("/users/profileTeacher", roleMiddleware("TEACHER"), payloadMiddleWare(updateTeacherValidationSchema), putTeacherProfile);
privateRouter.put("/users/profile", payloadMiddleWare(updateUserValidationSchema), putUserProfile);


module.exports = privateRouter;