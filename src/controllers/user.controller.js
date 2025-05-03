const { findUserById, updateUser, updateTeacher } = require("../repositories/user.repository");

const putTeacherProfile = async (req, res, next) => {
  const { body } = req;
  const { userId } = req.user;

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updatedUser = await updateTeacher(user, body);

    res.status(200).json({ message: "Perfil de maestro actualizado exitosamente", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const putUserProfile = async (req, res, next) => {
  const { body } = req;
  const { userId } = req.user;

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updatedUser = await updateUser(user, body);

    res.status(200).json({ message: "Perfil actualizado exitosamente", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  putTeacherProfile,
  putUserProfile,
};
