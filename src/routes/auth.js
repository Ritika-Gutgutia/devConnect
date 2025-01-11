const express = require("express");
const router = express.Router();
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.send("Successfully logging the req!");
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    validateLoginData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (user === null) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.send("User logout!!");
});

module.exports = router;
