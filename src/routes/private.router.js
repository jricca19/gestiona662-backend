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

const payloadMiddleWare = require("../middlewares/payload.middleware");
const {createPublicationSchema, updatePublicationSchema} = require("../models/schemas/publication.schema");
const SchoolSchema = require("../models/schemas/school.schema");
const TeacherSchema = require("../models/schemas/teacher.schema");

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

privateRouter.get("/teachers", getTeachersController);
privateRouter.get("/teachers/:id", getTeacherController);
privateRouter.post("/teachers", payloadMiddleWare(TeacherSchema), postTeacherController);
privateRouter.delete("/teachers/:id", deleteTeacherController);
privateRouter.put("/teachers/:id", payloadMiddleWare(TeacherSchema), putTeacherController);

module.exports = privateRouter;