const blogSchema = require("../schemas/blogSchema");

const createBlog = async ({ title, textBody, userId }) => {
  return new Promise(async (resolve, reject) => {
    const blogObj = new blogSchema({
      title: title,
      textBody: textBody,
      userId: userId,
      creationDateTime: Date.now(),
    });
    console.log(blogObj);
    try {
      const blogDb = await blogObj.save();
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBlogs = ({ SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogDb = await blogSchema.aggregate([
        {
          $sort: { creationDateTime: -1 }, //-1 DESC, +1 ASCD
        },
      ]);
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createBlog, getAllBlogs };
