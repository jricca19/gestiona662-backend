const {
    saveUser,
    findUserByUsername,
    findUser,
    isValidPassword,
  } = require("../models/users.model");
  
  const postAuthLogin = async (req, res) => {
    const { body } = req;
    const { username, password } = body;
    const user = findUser(username);
  
    if (!user) {
      res.status(400).json({ message: "Credenciales incorrectas" });
      return;
    }
    const isValidPass = await isValidPassword(password, user.password);
    if (!isValidPass) {
      res.status(401).json({ message: "Credenciales incorrectas" });
      return;
    }
    res.json({ message: "Inicio de sesion correcto" });
  };
  
  const postAuthSignUp = async (req, res) => {
    const { body } = req;
    const { name, username, password } = body;
  
    if (findUserByUsername(username)) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }
    const userID = await saveUser(name, username, password);
    res.status(201).json({ message: "Usuario creado exitosamente", id: userID });
  };
  
  module.exports = {
    postAuthLogin,
    postAuthSignUp,
  };
  