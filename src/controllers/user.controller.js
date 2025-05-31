const { updateUser, updateTeacher, findUserByIdWithSchools } = require("../repositories/user.repository");
const User = require("../models/user.model"); // Importar el modelo de usuario

const getUserProfile = async (req, res, next) => {
  const { _id } = req.user;
  try {
    if (!_id) {
      return res.status(400).json({ message: "No existen datos del usuario" });
    }

    // Verificar si el usuario tiene staffProfile con schoolIds
    if (req.user.staffProfile && Array.isArray(req.user.staffProfile.schoolIds) && req.user.staffProfile.schoolIds.length > 0) {
      // Buscar el usuario y popular las escuelas
      const populatedUser = await findUserByIdWithSchools(_id);
      return res.status(200).json(populatedUser);
    }

    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

const putTeacherProfile = async (req, res, next) => {
  const { body } = req;
  const { _id } = req.user;
  try {

    const updatedUser = await updateTeacher(_id, body);

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const putUserProfile = async (req, res, next) => {
  const { body } = req;
  const { _id } = req.user;

  try {
    const updatedUser = await updateUser(_id, body);

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  putTeacherProfile,
  putUserProfile,
};
