const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const adminprotect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");
      // NOTE: We need to check if a user was found
      if (!req.user) {
        res.status(401);
        throw new Error("User Note Found");
      }

      if (req.user.isAdmin) {
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized || You're note Admin  ");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Token Not Found");
  }
});

module.exports = adminprotect;
