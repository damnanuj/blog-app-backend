const User = require("../models/userModel");

const {
  followUser,
  getFollowingList,
  getFollowerList,
  unfollowUser,
} = require("../models/followModel");

// ===============follow user=================
const followController = async (req, res) => {
  const followingUserId = req.body.followingUserId;
  const followerUserId = req.session.user.userId;

  try {
    await User.findUserWithKey({ key: followingUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "The user you are trying to follow not found",
      error: error,
    });
  }
  try {
    await User.findUserWithKey({ key: followerUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Follower userId not valid",
      error: error,
    });
  }

  //initialzing schema and saving both persons id
  try {
    const followDb = await followUser({ followingUserId, followerUserId });
    return res.send({
      status: 201,
      message: "Follow successfull",
      data: followDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal sever error",
      error: error,
    });
  }
};

//============== following list controller
const getfollowingListController = async (req, res) => {
  const followerUserId = req.session.user.userId;
  const SKIP = parseInt(req.query.skip) || 0;

  try {
    const followingListDb = await getFollowingList({ followerUserId, SKIP });
    return res.send({
      status: 200,
      message: "Following List read success",
      data: followingListDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal sever error",
      error: error,
    });
  }
};

//============== follower list controller
const getfollowerListController = async (req, res) => {
  //followingUserId => jiske followers hain
  const followingUserId = req.session.user.userId;
  const SKIP = parseInt(req.query.skip) || 0;

  try {
    const followerListDb = await getFollowerList({ followingUserId, SKIP });
    return res.send({
      status: 200,
      message: "Follower List read success",
      data: followerListDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal sever error",
      error: error,
    });
  }
};

// ===============Unfollow user=================
const unfollowController = async (req, res) => {
  const followingUserId = req.body.followingUserId;
  const followerUserId = req.session.user.userId;

  try {
    const unfollowedUserDb = await unfollowUser({
      followerUserId,
      followingUserId,
    });

   

    return res.send({
      status: 200,
      message: "Unfollow successfull",
      data: unfollowedUserDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal sever error",
      error: error,
    });
  }
};

module.exports = {
  followController,
  getfollowingListController,
  getfollowerListController,
  unfollowController,
};
