const { LIMIT } = require("../privateConstants");
const blogSchema = require("../schemas/blogSchema");

// ========  create Blog ========
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

// ========  Get all Blogs ========
const getAllBlogs = ({ SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogDb = await blogSchema.aggregate([
        {
          $match:{isDeleted:{$ne:true}}
        },
        {
          $sort: { creationDateTime: -1 }, //-1 DESC, +1 ASCD
        },
        {
          $skip: SKIP,
        },
        {
          $limit: LIMIT,
        },
      ]);
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

// ========  Get only Users Blogs ========
const getmyBlogs = ({ userId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    //match based on only user blogs > sort >pagination

    try {
      const myblogsDb = await blogSchema.aggregate([
        {
          $match: { userId: userId , isDeleted:{$ne:true} },
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
      resolve(myblogsDb);
    } catch (error) {
      reject(error);
    }
  });
};

// ========  find a blog with Blog Id ========
const getBlogWithId = ({ blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!blogId) {
        reject("Blog id is missing");
      }
      const blogDb = await blogSchema.findOne({ _id: blogId });
      if (!blogDb) {
        reject(`Blog not found with blogId : ${blogId}`);
      }
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

// function to Edit the blog in Database
const editBlog = ({ title, textBody, blogId }) => {
  return new Promise(async (reslove, reject) => {
    try {
      const blogPrevDb = await blogSchema.findOneAndUpdate(
        { _id: blogId },
        { title: title, textBody: textBody }
      );
      reslove(blogPrevDb);
    } catch (error) {
      reject(error);
    }
  });
};

//function find and delete the blog from db
const deleteBlog = ({ blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const deletedBlogDb = await blogSchema.findOneAndDelete({ _id: blogId });
      const deletedBlogDb = await blogSchema.findOneAndUpdate(
        { _id: blogId },
        { isDeleted: true, deletionDateTime: Date.now() }
      );
      resolve(deletedBlogDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getmyBlogs,
  getBlogWithId,
  editBlog,
  deleteBlog,
};
