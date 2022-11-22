const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected : ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(error.message.red.underline.bold);
  }
};

module.exports = connectDB;
