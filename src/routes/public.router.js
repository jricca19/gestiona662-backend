const express = require("express");
const publicRouter = express.Router();

const {
  healthController,
  getDepartmentsController,
  getDepartmentController,
} = require("../controllers/public.controller");

publicRouter.get("/health", healthController);
publicRouter.get("/departments", getDepartmentsController);
publicRouter.get("/departments/:id", getDepartmentController);

module.exports = publicRouter;