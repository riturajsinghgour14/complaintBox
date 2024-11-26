const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      requried: true,
    },
    text: {
      type: String,
      requried: [true, "Please Comment Your Notes"],
    },
    isStaff: {
      type: Boolean,
      default: false,
      require: true,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
