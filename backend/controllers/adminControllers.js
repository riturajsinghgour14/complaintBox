const expressAsyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const Ticket = require("../models/ticketModel");

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await Users.find().select("-password");

  if (!users) {
    res.status(404);
    throw new Error("Users Not Found!!");
  }

  res.status(200).json(users);
});

const getTickets = expressAsyncHandler(async (req, res) => {
  const tickets = await Ticket.find();

  if (!tickets) {
    res.status(404);
    throw new Error("Tickets Not Found!!");
  }

  res.status(200).json(tickets);
});

module.exports = { getUsers, getTickets };
