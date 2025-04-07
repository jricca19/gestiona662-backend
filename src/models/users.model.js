const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "User1",
    username: "user.1",
    password: "$2b$10$QhT3d/5k2k77riLIhMjcwu29eILRASWkupGvKA0AG.Qrv5LIeC4E.",
    active: true,
  },
  {
    id: 2,
    name: "User2",
    username: "user.2",
    password: "$2b$10$ONVSf5Riv8PnvcRs7f9Iju6NJr3STsuGYSaVA2xoEQWlthcaRqha6",
    active: true,
  },
  {
    id: 3,
    name: "User3",
    username: "user.3",
    password: "$2b$10$mdoROv3.xjfwPOHnVuE4M.0uogFXmhllUCFvdBpFNISdqsf2YxDP.",
    active: true,
  },
];

const getUsers = () => users;

const findUser = (username) => {
  const user = users.find((u) => u.username == username);
  return user;
};

const isValidPassword = async (password, userPassword) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
};

const findUserByUsername = (username) => {
  const user = users.find((u) => u.username == username);
  return user;
};

const saveUser = async (name, username, password) => {
  const lastUser = users[users.length - 1];
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name: name,
    username: username,
    password: hashedPassword,
    active: true,
  };
  if (lastUser) {
    newUser.id = lastUser.id + 1;
  } else {
    newUser.id = 1;
  }
  users.push(newUser);
  return newUser.id;
};

module.exports = { saveUser, findUser, findUserByUsername, isValidPassword };