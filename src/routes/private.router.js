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

// const {
//     getPublicationDaysController,
//     getPublicationDayController,
//     postPublicationDayController,
//     deletePublicationDayController,
//     putPublicationDayController,
// } = require("../controllers/publicationDays.controller");

const { putUserProfile } = require("../controllers/user.controller");

const payloadMiddleWare = require("../middlewares/payload.middleware");
const { createPublicationSchema, updatePublicationSchema,publicationDaySchema } = require("./validations/publication.validation");
const schoolValidationSchema = require("./validations/school.validation");
const { createPostulationSchema, updatePostulationSchema } = require("./validations/postulation.validation");
const RatingSchema = require("./validations/rating.validation");
const PostulationDaySchema = require("./validations/postulationDay.validation");
// const PublicationDaySchema = require("./validations/publicationDay.validation");
const roleMiddleware = require("../middlewares/role.middleware");

privateRouter.get("/publications", getPublicationsController);
privateRouter.get("/publications/:id", getPublicationController);
privateRouter.post("/publications", roleMiddleware("STAFF"), payloadMiddleWare(createPublicationSchema),postPublicationController);
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
privateRouter.put("/schools/:id", roleMiddleware("STAFF"), payloadMiddleWare(schoolValidationSchema), putSchoolController);

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

// privateRouter.get("/publicationDays", getPublicationDaysController);
// privateRouter.get("/publicationDays/:id", getPublicationDayController);
// privateRouter.post("/publicationDays", payloadMiddleWare(PublicationDaySchema), postPublicationDayController);
// privateRouter.delete("/publicationDays/:id", deletePublicationDayController);
// privateRouter.put("/publicationDays/:id", payloadMiddleWare(PublicationDaySchema), putPublicationDayController);

privateRouter.put("/users/profile", putUserProfile);

module.exports = privateRouter;