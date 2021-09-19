const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  userLogin,
  userLogout,
  userSignup,
  userUpdate,
} = require("../controllers/userController");

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/update/:id", userUpdate);
router.post("/logout", auth, userLogout);

module.exports = router;
