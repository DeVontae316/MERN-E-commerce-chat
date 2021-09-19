const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "Admin@gmail.com",
    password: bcrypt.hashSync("Admin", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "John@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "Jane@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Frank Doe",
    email: "Frank@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

module.exports = users;
