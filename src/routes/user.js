const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { connection } = require("mongoose");
const User = require("../models/user");
const router = express.Router();

const USER_SAFE_DATA = "firstName lastName gender age about skills photoUrl";

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
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.equals(userId)) {
        return row.toUserId;
      }

      return row.fromUserId;
    });
    res.json({
      message: "All Connections retrieved successfully!",
      data,
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
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: `${loggedInUser.firstName}'s received connection requests`,
      data: connectionRequestReceived,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const loggedInUserId = loggedInUser._id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skipDocuments = (page - 1) * limit;

    limit = limit > 50 ? 50 : limit;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUserId,
        },
        {
          toUserId: loggedInUserId,
        },
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId);
      hideUsersFromFeed.add(request.toUserId);
    });

    const users = await User.find({
      $and: [
        {
          _id: {
            $nin: Array.from(hideUsersFromFeed),
          },
        },
        {
          _id: {
            $ne: loggedInUserId,
          },
        },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skipDocuments)
      .limit(limit);

    res.json({
      message: `${loggedInUser.firstName}'s feeed`,
      users,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = router;
