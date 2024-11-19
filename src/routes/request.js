const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

router.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatusFields = ["interested", "ignored"];
    if (!allowedStatusFields.includes(status)) {
      return res.status(400).json({
        message: "Invalid connection request",
      });
    }
    if (fromUserId === toUserId) {
      return res.status(404).json({
        message: "Invalid connection request",
      });
    }
    const toUserIdExists = await User.findById(toUserId);

    if (!toUserIdExists) {
      return res.status(404).json({
        message: "Invalid connection request",
      });
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Invalid connection request",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.json({
      message: "Connection request sent successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
