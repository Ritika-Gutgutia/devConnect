const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gutgutiaritika:JMUr8tvsDXka0ARz@namastenode.mejnn.mongodb.net/devConnect"
  );
};

module.exports = connectDB;
