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

const payloadMiddleWare = require("../middlewares/payload.middleware");
const {createPublicationSchema, updatePublicationSchema} = require("./validations/publication.validation");
const SchoolSchema = require("./validations/school.validation");

privateRouter.get("/publications", getPublicationsController);
privateRouter.get("/publications/:id", getPublicationController);
privateRouter.post("/publications", payloadMiddleWare(createPublicationSchema), postPublicationController);
privateRouter.delete("/publications/:id", deletePublicationController);
privateRouter.put("/publications/:id", payloadMiddleWare(updatePublicationSchema), putPublicationController);

privateRouter.get("/schools", getSchoolsController);
privateRouter.get("/schools/:id", getSchoolController);
privateRouter.post("/schools", payloadMiddleWare(SchoolSchema), postSchoolController);
privateRouter.delete("/schools/:id", deleteSchoolController);
privateRouter.put("/schools/:id", payloadMiddleWare(SchoolSchema), putSchoolController);

module.exports = privateRouter;