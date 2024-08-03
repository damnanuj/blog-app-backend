const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema({
  //person A ----> Person B
  followerUserId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  followingUserId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  creationDateTime: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("follow", followSchema);

//userA ----> userB