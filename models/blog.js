const mongoose = require("mongoose");

const Blog = mongoose.model("Blog", {
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: []
});

module.exports = Blog;
