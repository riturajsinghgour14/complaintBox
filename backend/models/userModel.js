const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please Fill Name!"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "Please Fill Email!"],
    },
    password: {
      type: String,
      require: [true, "Please Fill Password!"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      require: [true, "Please Fill Name!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
