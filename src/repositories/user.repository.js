const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const getUsers = async () => {
  return await User.find().select("name email active");
};

const findUserById = async (id) => {
  return await User.findById(id).select("name email active");
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

const createUser = async (name, lastName, ci, email, password, phoneNumber, role, isEffectiveTeacher, teacherProfile, staffProfile) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, lastName, ci, email, password: hashedPassword, phoneNumber, role, });
  await newUser.save();
  return newUser;
};

const deleteUser = async (id) => {
  return await User.deleteOne({ _id: id });
};

const updateUser = async (id, payload) => {
  const user = await User.findOne({ _id: id });

  if (user) {
    Object.entries(payload).forEach(([key, value]) => {
      user[key] = value;
    });
    await user.save();
  }
  return user;
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
  updateUser
};