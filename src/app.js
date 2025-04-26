require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../gestiona-api/swagger.json");
const app = express();

const authMiddleWare = require("./middlewares/auth.middleware");
const xssMiddleware = require("./middlewares/xss.middleware");
const privateRouter = require("./routes/private.router");
const publicRouter = require("./routes/public.router");
const authRouter = require("./routes/auth.router");
const connectMongoDB = require("./models/mongo.client");

(async () => {
  try {
    await connectMongoDB();
  } catch (error) {
    console.log(
      "Ha ocurrido un error al intentar conectarse a MongoDB: ",
      error
    );
    process.exit(1);
  }
})();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(xssMiddleware);

// Public
app.use("/", publicRouter);
app.use("/v1/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authMiddleWare);

// Private
app.use("/v1", privateRouter);

module.exports = app;