const express = require("express");
const {
  createBlogController,
  getBlogsController,
} = require("../controllers/blogController");
const blogRouter = express.Router();

blogRouter
  .post("/create-blog", createBlogController)
  .get("/get-blogs", getBlogsController);

module.exports = blogRouter;
