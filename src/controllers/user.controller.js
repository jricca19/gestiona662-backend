const { updateUser, updateTeacher } = require("../repositories/user.repository");

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
  putTeacherProfile,
  putUserProfile,
};
