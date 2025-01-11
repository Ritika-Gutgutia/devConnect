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

router.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const toUserId = req.user._id;
    const status = req.params.status;
    const allowedStatusFields = ["accepted", "rejected"];

    if (!allowedStatusFields.includes(status)) {
      return res.status(400).json({
        message: "Invalid Connection review request",
      });
    }

    const connectionRequestData = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId,
      status: "interested",
    });

    if (!connectionRequestData) {
      return res.status(404).json({
        message: "Invalid Connection review request",
      });
    }

    connectionRequestData.status = status;
    await connectionRequestData.save();

    res.json({
      message: `Connection request ${status}`,
      data: connectionRequestData,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
