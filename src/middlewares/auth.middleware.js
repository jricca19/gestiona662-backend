const jwt = require("jsonwebtoken");
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });

  // Check if the token has the 'Bearer ' prefix for swagger compatibility
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1] // Extract token after 'Bearer '
    : authHeader; // Use the full header if no 'Bearer ' prefix

  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token format" });

  try {
    const verified = jwt.verify(token, AUTH_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleWare;