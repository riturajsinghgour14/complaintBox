const express = require("express");
const { registerUser, loginUser, privateController } = require("../controllers/userControllers");
// const {
//   registerUser,
//   loginUser,
//   privateController,
// } = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register User
router.post("/register",registerUser);

// Login User
router.post("/login", loginUser);

// Private Route
router.get("/private", privateController);

module.exports = router;
