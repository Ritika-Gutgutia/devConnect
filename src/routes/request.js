const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " is sending the connection request");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;
