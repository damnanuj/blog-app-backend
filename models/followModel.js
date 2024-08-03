const { LIMIT } = require("../privateConstants");
const followSchema = require("../schemas/followSchema");
const userSchema = require("../schemas/userSchema");

const followUser = ({ followingUserId, followerUserId }) => {
  return new Promise(async (resolve, reject) => {
    const followObj = new followSchema({
      followingUserId: followingUserId,
      followerUserId: followerUserId,
    });

    try {
      const followDb = await followObj.save();
      resolve(followDb);
    } catch (error) {
      reject(error);
    }
  });
};

// get the list of following by follwerId
const getFollowingList = ({ followerUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followingListDb = await followSchema.aggregate([
        {
          $match: { followerUserId: followerUserId },
        },
        {
          $sort: { creationDateTime: -1 },
        },
        {
          $skip: SKIP,
        },
        {
          $limit: LIMIT,
        },
      ]);

      const followingUserIdsArray = followingListDb.map((follow) => {
        return follow.followingUserId;
      });
//peterfe1 following=> Tony.c52, stephen.c4f, Steve.ff1, Matt.c5e, bruce.c6a
      // "6699368feb9b9851147dac6a",
      // "6699340beb9b9851147dac5e",
      // "6697c3ce31886a4478337ff1",
      // "669932dbeb9b9851147dac4f",
      // "6699330ceb9b9851147dac52"

     const followingUserDetails= await userSchema.find({_id: { $in: followingUserIdsArray },});
      // console.log(followingUserDetails);



      resolve(followingUserDetails.reverse());
    } catch (error) {
      reject(error);
    }
  });
};





const getFollowerList = ({ followingUserId, SKIP }) => {
  //followingUserId => jiske followers hain
  return new Promise(async (resolve, reject) => {
    try {

      const followerListDb = await followSchema.aggregate([
        {
          $match: { followingUserId: followingUserId },
        },
        {
          $sort: { creationDateTime: -1 },
        },
        {
          $skip: SKIP,
        },
        {
          $limit: LIMIT,
        },
      ]);
      //returning ids
      const followerUserIdsArray = followerListDb.map(
        (follow) => follow.followerUserId
      );
      const followerUserDetails = await userSchema.find({
        _id: { $in: followerUserIdsArray },
      });
      //peter followers => anuj, bruce
      resolve(followerUserDetails.reverse());
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { followUser, getFollowingList, getFollowerList };
