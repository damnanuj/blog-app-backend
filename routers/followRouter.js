const express = require("express");
const followRouter = express.Router();

const {
  followController,
  getfollowingListController,
} = require("../controllers/followController");

followRouter.post("/follow-user", followController)
followRouter.get("/following-list", getfollowingListController);

module.exports = followRouter;
