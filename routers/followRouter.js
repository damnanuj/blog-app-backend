const express = require("express");
const followRouter = express.Router();

const {
  followController,
  getfollowingListController,
  getfollowerListController
} = require("../controllers/followController");

followRouter.post("/follow-user", followController)
followRouter.get("/following-list", getfollowingListController);
followRouter.get("/follower-list", getfollowerListController);

module.exports = followRouter;
