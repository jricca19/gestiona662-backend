const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const getUsers = async () => {
  return await User.find();
};

const findUserById = async (userId) => {
  return await User.findById(userId);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() });
};

const findUserByCI = async (ci) => {
  return await User.findOne({ ci });
};

const isValidPassword = async (password, userPassword) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
};

const createUser = async (name, lastName, ci, email, password, phoneNumber, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    lastName,
    ci,
    email: email.toLowerCase(),
    password: hashedPassword,
    phoneNumber,
    role: role.toUpperCase(),
  });

  await newUser.save();
  return newUser;
};

const deleteUser = async (id) => {
  return await User.deleteOne({ _id: id });
};

const updateUser = async (user, payload) => {
  Object.entries(payload).forEach(([key, value]) => {
    if (key in user) {
      user[key] = value;
    }
  });

  await user.save();
  return user;
};

const updateTeacher = async (user, payload) => {
  if (!user.teacherProfile) {
    user.teacherProfile = {};
  }

  Object.entries(payload).forEach(([key, value]) => {
    if (key in user.teacherProfile) {
      user.teacherProfile[key] = value;
    }
  });

  await user.save();
  return user;
};

const addSchoolToUserProfile = async (user, schoolId) => {
  if (user && user.staffProfile) {
    if (!user.staffProfile.schoolIds.includes(schoolId)) {
      user.staffProfile.schoolIds.push(schoolId);
      await user.save();
    }
  }
};

const removeSchoolFromUserProfiles = async (schoolId) => {
  await User.updateMany(
    { "staffProfile.schoolIds": schoolId },
    { $pull: { "staffProfile.schoolIds": schoolId } }
  );
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByCI,
  isValidPassword,
  getUsers,
  createUser,
  findUserById,
  deleteUser,
  updateUser,
  updateTeacher,
  addSchoolToUserProfile,
  removeSchoolFromUserProfiles,
};