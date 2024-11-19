const mongoose = require("mongoose");

const connectRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: String,
      required: true,
    },
    toUserId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is an invalid status`,
      },
    },
  },
  { timestamps: true }
);

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectRequestSchema
);

module.exports = ConnectionRequest;
