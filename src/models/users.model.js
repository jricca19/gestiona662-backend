const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "User1",
    username: "user.1",
    //password: usertest.1
    password: "$2b$10$QhT3d/5k2k77riLIhMjcwu29eILRASWkupGvKA0AG.Qrv5LIeC4E.",
    active: true,
  },
  {
    id: 2,
    name: "User2",
    username: "user.2",
    //password: usertest.2
    password: "$2b$10$PbnrtcS8Rp8Vzk8tAIZXeOoKZbf0HnImyn7Zkj/t3/68GHtbNQ38a",
    active: true,
  },
  {
    id: 3,
    name: "User3",
    username: "user.3",
    //password: usertest.3
    password: "$2b$10$Q3yMhOy4kYDWCq6HBVrXXeJnnHf.qVEGethdv4tD/yvUWg/Eh6LSW",
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

module.exports = { saveUser, findUser, isValidPassword };