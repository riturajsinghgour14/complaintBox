
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //  Hase Password
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("User Can Not Be Register");
  }

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    isAdmin: user.isAdmin,
  });
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  const user = await User.findOne({ email: email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  }
else{
  res.status(400);
    throw new Error("Invaid Credentials");
}
});

const privateController = expressAsyncHandler(async (req, res) => {
  res.json(req.user);
});

// Generate Token

const generateToken = (id) => {
  let token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = { registerUser, loginUser, privateController };
