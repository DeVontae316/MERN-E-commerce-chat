const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getProducts, getProduct } = require("../controllers/productController");

router.get("/", /* auth, */ getProducts);

router.get("/:id", getProduct);

module.exports = router;
