const expressAsyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const getTickets = expressAsyncHandler(async (req, res) => {
  //Check is user exists in our DB
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid User");
  }
  const tickets = await Ticket.find({ user: user._id });

  if (!tickets) {
    req.status(404);
    throw new Error("Ticket Not Found!!");
  }

  res.json(tickets);
});

// Get Single Ticket
const getTicket = expressAsyncHandler(async (req, res) => {
  //Check is user exists in our DB
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid User");
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!!");
  }

  res.json(ticket);
});

// Add Ticket
const addTicket = expressAsyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid User");
  }

  const ticket = await Ticket.create({
    user: user._id,
    product: product,
    description: description,
    status: "new",
  });

  if (!ticket) {
    req.status(401);
    throw new Error("Ticket Cannot Be Created!!");
  }

  res.status(201).json(ticket);
});

//  updateTicket
const updateTicket = expressAsyncHandler(async (req, res) => {
  // Check is user exixt in our db
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("Invalid User");
  }

  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updateTicket) {
    res.status(400);
    throw new Error("Can Not Update");
  }
  res.status(200);
  res.json(updateTicket);
});

module.exports = { getTickets, addTicket, getTicket, updateTicket };
