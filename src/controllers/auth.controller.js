const jwt = require("jsonwebtoken");

const {
  createUser,
  findUser,
  isValidPassword,
} = require("../repositories/user.repository");

const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

const postAuthLogin = async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  const user = await findUser(username);

  if (!user) {
    res.status(400).json({ message: "Credenciales inválidas" });
    return;
  }
  const isValidPass = await isValidPassword(password, user.password);
  if (!isValidPass) {
    res.status(401).json({ message: "Credenciales inválidas" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    AUTH_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
  res.status(200).json({ token: token });
};

const postAuthSignUp = async (req, res) => {
  const { body } = req;
  const { name, username, password } = body;

  const user = await findUser(username);

  if (user) {
    res.status(400).json({ message: "Nombre de usuario ya en uso" });
    return;
  }
  const userID = await createUser(name, username, password);

  if (!userID) {
    res.status(500).json({ message: "Error al crear el usuario" });
    return;
  }

  const token = jwt.sign(
    { id: userID, username: username },
    AUTH_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );

  res.status(201).json({ message: "Usuario creado exitosamente", token: token });
};

module.exports = {
  postAuthLogin,
  postAuthSignUp,
};
