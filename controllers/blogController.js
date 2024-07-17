const { blogDataValidator } = require("../utills/blogUtills");

const {
  createBlog,
  getAllBlogs,
  getmyBlogs,
  getBlogWithId,
  editBlog,
  deleteBlog,
} = require("../models/blogModel");
const blogSchema = require("../schemas/blogSchema");

//=================Create Blogs Controller
const createBlogController = async (req, res) => {
  const { title, textBody } = req.body;
  const userId = req.session.user.userId;

  //data validation
  try {
    await blogDataValidator({ title, textBody });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Invalid blog data",
      error: error,
    });
  }

  //   Sending data to createblog Model Controller to save in Db
  try {
    const blogDb = await createBlog({ title, textBody, userId });
    return res.send({
      status: 201,
      message: "Blog created successfully",
      data: blogDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

//==============get all blogs Controller

const getBlogsController = async (req, res) => {
  const SKIP = parseInt(req.query.skip) || 0;

  try {
    const allBlogsDb = await getAllBlogs({ SKIP });
    return res.send({
      status: 200,
      message: "Read allblogs successfull",
      data: allBlogsDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal sever error",
      error: error,
    });
  }
};

//==============my blogscontroller
const getMyBlogsController = async (req, res) => {
  const userId = req.session.user.userId;
  const SKIP = parseInt(req.query.skip) || 0;

  try {
    const myblogsDb = await getmyBlogs({ userId, SKIP });

    if (myblogsDb.length < 1) {
      return res.send({
        status: 204,
        message: "No more blogs found",
      });
    }
    return res.send({
      status: 200,
      message: "Read my blogs success",
      data: myblogsDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal sever error",
      error: error,
    });
  }
};

// ===========Edit blog Controller
const editBlogController = async (req, res) => {
  const { title, textBody, blogId } = req.body;
  const userId = req.session.user.userId;
  //data Validation
  try {
    await blogDataValidator({ title, textBody });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Invalid data",
      error: error,
    });
  }

  //find the blog
  try {
    const blogDb = await getBlogWithId({ blogId });
    //ownership check
    if (!userId.equals(blogDb.userId)) {
      return res.send({
        status: 403,
        message: "You are not allowed to edit",
      });
    }
    //update/edit the blog
    const blogPrevDb = await editBlog({ title, textBody, blogId });
    return res.send({
      status: 200,
      message: "Blog edited successfully",
      data: blogPrevDb,
    });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Invalid data",
      error: error,
    });
  }
};

//=========Delete Blog Controller
const deleteBlogController = async (req, res) => {
  const { blogId } = req.body;
  const userId = req.session.user.userId;

  //find the blog
  try {
    const blogDb = await getBlogWithId({ blogId });

    //ownership check

    if (!userId.equals(blogDb.userId)) {
      return res.send({
        status: 403,
        message: "You are not allowed to delete",
      });
    }

    //delete the blog
    const deletedBlog = await deleteBlog({ blogId });
    return res.send({
      status: 200,
      message: "Blog deleted successfully",
      data: deleteBlog,
    });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Invalid data",
      error: error,
    });
  }
  res.send("delete working");
};

module.exports = {
  createBlogController,
  getBlogsController,
  getMyBlogsController,
  editBlogController,
  deleteBlogController,
};
