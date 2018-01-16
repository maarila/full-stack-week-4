const mongoose = require("mongoose");

const BlogComment = mongoose.model("BlogComment", {
  blogId: String,
  comment: String,
});

module.exports = BlogComment;