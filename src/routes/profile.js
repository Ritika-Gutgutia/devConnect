const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");
const User = require("../models/user");

router.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.patch("/edit", userAuth, async (req, res) => {
  try {
    validateProfileData(req);
    const data = req.body;
    const user = req.user;
    Object.keys(data).forEach((key) => (user[key] = data[key]));
    await user.save();
    res.json({
      message: `${user.firstName}'s profile updated successfully`,
      user,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.patch("/edit/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const oldPasswordInput = req.body.oldPassword;

    const isPasswordValid = await bcrypt.compare(
      oldPasswordInput,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const newPasswordInput = req.body.newPassword;

    const hashPassword = await bcrypt.hash(newPasswordInput, 10);

    await User.findByIdAndUpdate({ _id: user._id }, { password: hashPassword });
    res.send("Password updated successfully!!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = router;
