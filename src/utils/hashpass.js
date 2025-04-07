const bcrypt = require("bcryptjs");

const password = "usertest.1";
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error al generar el hash:", err);
    return;
  }
  console.log("Hash generado:", hash);
});