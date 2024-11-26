const express = require("express");
const { getNotes, addNote } = require("../controllers/noteControllers");
const protect = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect,addNote );

module.exports = router;