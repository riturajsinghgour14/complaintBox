const express = require("express");
const { getUsers, getTickets } = require("../controllers/adminControllers");
const adminprotect = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/users", adminprotect, getUsers);
router.get("/tickets", adminprotect, getTickets);

module.exports = router;
