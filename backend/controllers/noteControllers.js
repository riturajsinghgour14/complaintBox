const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");

const addNote = expressAsyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("Invaid User Data");
  }

  const note = await Note.create({
    user: req.user._id,
    ticket: req.params.ticketId,
    text,
  });

  if (!note) {
    res.status(401);
    throw new Error("Note cannot Created!!");
  }

  res.status(201).json(note);
});

const getNotes = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("Invaid User Data");
  }
  

  const notes = await Note.find({ user: req.user._id });

  if (!notes) {
    res.status(404);
    throw new Eroro("Note Not Found!!");
  }

  res.status(200).json(notes);
});

module.exports = { addNote, getNotes };
