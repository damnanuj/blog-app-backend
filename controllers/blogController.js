const { blogDataValidator } = require("../utills/blogUtills");

const { createBlog, getAllBlogs } = require("../models/blogModel");

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

//get all blogs

const getBlogsController = async (req, res) => {
  const SKIP = req.query.skip || 0;

  try {
    const blogsDb = await getAllBlogs({ SKIP });

    return res.send({
      status: 200,
      message: "Read allblogs successfull",
      data: blogsDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal sever error",
      error: error,
    });
  }
};

module.exports = { createBlogController, getBlogsController };
