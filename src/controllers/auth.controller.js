const jwt = require("jsonwebtoken");

const {
  createUser,
  findUser,
  isValidPassword,
} = require("../repositories/user.repository");

const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

const postAuthLogin = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  const user = await findUser(email);

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
    { id: user.id, email: user.email },
    AUTH_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
  res.status(200).json({ token: token });
};

const postAuthSignUp = async (req, res) => {
  const { body } = req;
  const { name, lastName, ci, email, password, phoneNumber, role, isEffectiveTeacher, teacherProfile, staffProfile } = body;

  const user = await findUser(email);

  if (user) {
    res.status(400).json({ message: "Correo electrónico en uso" });
    return;
  }

  if (role === "TEACHER" && !teacherProfile) {
    res.status(400).json({ message: "Perfil de maestro requerido para el rol TEACHER" });
    return;
  }

  if (role === "STAFF" && !staffProfile) {
    res.status(400).json({ message: "Perfil de personal requerido para el rol STAFF" });
    return;
  }

  const newUser = await createUser(name, lastName, ci, email, password, phoneNumber, role, isEffectiveTeacher, teacherProfile, staffProfile);

  if (!newUser) {
    res.status(500).json({ message: "Error al crear el usuario" });
    return;
  }

  const token = jwt.sign(
    { id: newUser._id, name: newUser.name, lastName: newUser.lastName, email: newUser.email },
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
