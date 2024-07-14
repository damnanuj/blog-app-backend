const { createBlog } = require("../models/blogModel");
const { blogDataValidator } = require("../utills/blogUtills");

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

module.exports = { createBlogController };
