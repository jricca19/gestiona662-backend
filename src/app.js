require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});

const authMiddleWare = require("./middlewares/auth.middleware");
const xssMiddleware = require("./middlewares/xss.middleware");
const privateRouter = require("./routes/private.router");
const publicRouter = require("./routes/public.router");

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(xssMiddleware);

// Public
app.use("/public", publicRouter);

app.use(authMiddleWare);

// Private
app.use("/v1", privateRouter);

