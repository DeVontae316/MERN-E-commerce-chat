const mongoose = require("mongoose");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");

const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

async function importCollections() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const Users = await User.insertMany(users);
    const adminUser = Users[0]._id;

    const Products = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(Products);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(`Error:${error}`);
    process.exit(1);
  }
}

async function deleteDatabase() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Items deleted");
    process.exit();
  } catch (error) {
    console.log(`Error:${error}`);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  deleteDatabase();
} else {
  importCollections();
}

/* async function importData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const userList = await User.insertMany(users);
    const adminUser = userList[0]._id;
    const productsList = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(productsList);
    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.error(`Error:${error}`);
    process.exit(1);
  }
}
async function destroyData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.error(`Error:${error}`);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
} */
