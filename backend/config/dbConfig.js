const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `DB CONNECTION SUCCESS : ${conn.connection.name}`.bgGreen.black
    );
  } catch (error) {
    console.log(`DB CONECTION FAILED : ${conn.connection.name}`.bgRed.black);
  }
};

module.exports = connectDB;
