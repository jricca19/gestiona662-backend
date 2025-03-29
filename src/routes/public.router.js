const express = require("express");
const publicRouter = express.Router();

const {
  healthController,
} = require("../controllers/public.controller");

publicRouter.get("/health", healthController);

module.exports = publicRouter;