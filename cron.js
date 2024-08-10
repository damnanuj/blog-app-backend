const cron = require("node-cron");
const blogSchema = require("./schemas/blogSchema");

const cleanUpBin = () => {
  cron.schedule("* * 0 * * *", async () => {
    try {
      const toBeDeletedBlogs = await blogSchema.find({ isDeleted: true });
      //   console.log(deletedBlogs);
      let deleteBlogsIds = [];
      if (toBeDeletedBlogs.length > 0) {
        toBeDeletedBlogs.map((blog) => {
          const timeDiff =
            (Date.now() - blog.deletionDateTime) / (1000 * 60 * 60 * 24);
          console.log(timeDiff);

          if (timeDiff > 43200) {
            deleteBlogsIds.push(blog._id);
          }
        });
        // console.log("Ids====>>", deleteBlogsIds);
        // console.log("ArrayLength===>",deleteBlogsIds.length);
        if (deleteBlogsIds.length > 0) {
          try {
            const deletedBlogs = await blogSchema.findOneAndDelete({
              _id: {
                $in: deleteBlogsIds,
              },
            });
            // console.log(`Id>>=>>${deletedBlogs._id}<<=<< blogs deleted successfully`);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = cleanUpBin;
