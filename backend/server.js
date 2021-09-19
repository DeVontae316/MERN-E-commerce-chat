const express = require("express");
const app = express();
const products = require("./data/products");
const dotenv = require("dotenv");

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRouter");

const connectDB = require("./config/db");
const chat = require("./chat");

const {
  customError,
  custom404,
} = require("../backend/middleware/errorMessages");

app.use(express.json());
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.use("/api/products", productRoute);
app.use("/user", userRoute);

app.use(custom404);
app.use(customError);

app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`));

const obj = {
  name: "Bill",
  age: 56,
};

obj.toJSON = function () {
  delete this.name;
  return this;
};
console.log(JSON.stringify(obj));
