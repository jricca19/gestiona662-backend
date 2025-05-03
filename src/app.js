require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../gestiona-api/swagger.json");
const app = express();
const Sentry = require("./utils/instrument");

const authMiddleWare = require("./middlewares/auth.middleware");
const xssMiddleware = require("./middlewares/xss.middleware");
const privateRouter = require("./routes/private.router");
const publicRouter = require("./routes/public.router");
const authRouter = require("./routes/auth.router");
const connectMongoDB = require("./models/mongo.client");
const connectToRedis = require("./services/redis.service");
const errorMiddleware = require("./middlewares/error.middleware");

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

(async () => {
  try {
    await connectToRedis();
    console.log("Conexión a redis establecida correctamente");
  } catch (error) {
    console.log("Ha ocurrido un error al intentar conectarse a Redis: ", error);
    process.exit(1);
  }
})();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(xssMiddleware);

const PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN;
const DEV_DOMAIN = process.env.DEV_DOMAIN;
const corsOptions = {
  origin: [PRODUCTION_DOMAIN, DEV_DOMAIN],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));


// Public
app.use("/", publicRouter);
app.use("/v1/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authMiddleWare);

// Private
app.use("/v1", privateRouter);

// Error middleware
app.use(errorMiddleware);

Sentry.setupExpressErrorHandler(app);

module.exports = app;