const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
const { getTickets, addTicket, getTicket, updateTicket } = require("../controllers/ticketController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect,addTicket);

router.route("/:id").get(protect, getTicket).put(protect, updateTicket);

router.route("/:ticketId/note", require("./noteRoutes"));

module.exports = router;
