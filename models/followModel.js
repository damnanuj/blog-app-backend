const { LIMIT } = require("../privateConstants");
const followSchema = require("../schemas/followSchema");

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
      const followingListDb = await followSchema.find({
        followerUserId: followerUserId,
      }).populate("followingUserId")
      .sort({creationDateTime: -1})
      .skip(SKIP)
      .limit(LIMIT)
      resolve(followingListDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { followUser, getFollowingList };
