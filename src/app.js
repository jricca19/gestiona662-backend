require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listen & serve PORT: ${PORT}`);
});

const authMiddleWare = require("./middlewares/auth.middleware");
const privateRouter = require("./routes/private.router");
const publicRouter = require("./routes/public.router");

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Public
app.use("/public", publicRouter);

app.use(authMiddleWare);

// Private
app.use("/v1", privateRouter);

