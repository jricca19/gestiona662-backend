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
const PublicationSchema = require("../models/schemas/publication.schema");
const SchoolSchema = require("../models/schemas/school.schema");

privateRouter.get("/publications", getPublicationsController);
privateRouter.get("/publications/:id", getPublicationController);
privateRouter.post("/publications", payloadMiddleWare(PublicationSchema), postPublicationController);
privateRouter.delete("/publications/:id", deletePublicationController);
privateRouter.put("/publications/:id", payloadMiddleWare(PublicationSchema), putPublicationController);

privateRouter.get("/schools", getSchoolsController);
privateRouter.get("/schools/:id", getSchoolController);
privateRouter.post("/schools", payloadMiddleWare(SchoolSchema), postSchoolController);
privateRouter.delete("/schools/:id", deleteSchoolController);
privateRouter.put("/schools/:id", payloadMiddleWare(SchoolSchema), putSchoolController);

module.exports = privateRouter;