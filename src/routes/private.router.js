const express = require("express");
const privateRouter = express.Router();

const {
    getPublicationsController,
    getPublicationController,
    postPublicationController,
    deletePublicationController,
    putPublicationController,
} = require("../controllers/publications.controller");

const payloadMiddleWare = require("../middlewares/payload.middleware");
const PublicationSchema = require("../models/schemas/publication.schema");

privateRouter.get("/publications", getPublicationsController);
privateRouter.get("/publications/:id", getPublicationController);
privateRouter.post("/publications", payloadMiddleWare(PublicationSchema), postPublicationController);
privateRouter.delete("/publications/:id", deletePublicationController);
privateRouter.put("/publications/:id", payloadMiddleWare(PublicationSchema), putPublicationController);

module.exports = privateRouter;