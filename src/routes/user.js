const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const router = express.Router();

router.get("/connections", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const connections = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: userId,
          status: "accepted",
        },
        {
          toUserId: userId,
          status: "accepted",
        },
      ],
    });

    res.json({
      message: "All Connections retrieved successfully!",
      connections,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.get("/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const userId = loggedInUser._id;

    const connectionRequestReceived = await ConnectionRequest.find({
      toUserId: userId,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");

    res.json({
      message: `${loggedInUser.firstName}'s received connection requests`,
      connectionRequestReceived,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = router;
