const express = require("express");
const followRouter = express.Router();

const {
  followController,
  getfollowingListController,
  getfollowerListController,
  unfollowController,
} = require("../controllers/followController");

followRouter.post("/follow-user", followController);
followRouter.get("/following-list", getfollowingListController);
followRouter.get("/follower-list", getfollowerListController);
followRouter.post("/unfollow-user", unfollowController);

module.exports = followRouter;
