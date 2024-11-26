const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    product: {
      type: String,
      enum: ["iPhone", "iPad", "iMatch", "Macbook", "imac"],
      require: true,
    },
    description: {
      type: String,
      require: [true, "Please Give Description of Issue"],
    },
    status: {
      type: String,
      enum: ["new", "open", "closed"],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
