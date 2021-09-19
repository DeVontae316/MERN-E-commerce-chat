const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  /* Retrieve token that will be sent with request from front end */
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const isMatch = jwt.verify(token, "Can't know my secret");
    const user = await User.findOne({
      _id: isMatch._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.send({ error: "Please authenticate" });
  }
};

module.exports = auth;
