const Product = require("../models/product");
const auth = require("../middleware/auth");

const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({});

  if (allProducts) {
    return res.send(allProducts);
  }
  res.status(400).send({ error: "Error with request" });
});
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById({ _id: id });
  if (product) {
    return res.send(product);
  } else {
    res.status(404);
    throw new Error("Testing new error abilities");
  }
});

module.exports = {
  getProducts,
  getProduct,
};
