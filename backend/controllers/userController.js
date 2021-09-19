const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.validateEmailAndPassword(email, password);
  const token = await user.assignToken();

  if (user && token) {
    res.send({ user, token });
  } else {
    res.status(400).send("Unable to complete request");
  }
});

const userSignup = asyncHandler(async (req, res) => {
  const user = await new User(req.body).save();
  const token = await user.assignToken();

  if (user) {
    res.send({ user, token });
  } else {
    res.status(400).send("Error signing up");
  }
});

const userUpdate = asyncHandler(async (req, res) => {
  const updates = Object.keys(req.body);
  const { id } = req.params;
  const allowedUpdates = ["email", "password", "name"];
  const isMatch = updates.every((update) => allowedUpdates.includes(update));

  if (!isMatch) {
    throw new Error("updates not allowed");
  }

  const user = await User.findById({ _id: id });

  if (user) {
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } else {
    res.send("Error with updating");
  }
});

const userLogout = asyncHandler(async (req, res) => {
  const removeToken = req.user.tokens.filter((token) =>
    token.token !== req.token ? token : null
  );
  req.user.tokens = removeToken;
  await req.user.save();
  console.log(removeToken);
  console.log(req.user);
  res.status(200).send("User logged out");
});
module.exports = {
  userLogin,
  userLogout,
  userSignup,
  userUpdate,
};
