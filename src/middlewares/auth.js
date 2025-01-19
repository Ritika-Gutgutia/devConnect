const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login!");
    }
    const decodedMessage = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedMessage;

    if (!_id) {
      throw new Error("User not found!!");
    }

    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
