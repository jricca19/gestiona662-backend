const express = require("express");
const router = express.Router();

const {
    getPublicationsController,
    getPublicationController,
    postPublicationController,
    deletePublicationController,
    putPublicationController,
} = require("../controllers/publications.controller");
const payloadMiddleWare = require("../middlewares/payload.middleware");
const PublicationSchema = require("../models/schemas/publication.schema");

// Private Routes
router.get("/publications", getPublicationsController);
router.get("/publications/:id", getPublicationController);
router.post("/publications", payloadMiddleWare(PublicationSchema), postPublicationController);
router.delete("/publications/:id", deletePublicationController);
router.put("/publications/:id", putPublicationController);

module.exports = router;