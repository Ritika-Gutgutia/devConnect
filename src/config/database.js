const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.PORT);
  await mongoose.connect(process.env.DB_CONNECTION_STR);
};

module.exports = connectDB;
