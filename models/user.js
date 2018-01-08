const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  password: String,
  name: String,
  adult: Boolean,
  blogs: [{type: mongoose.Schema.Types.ObjectId, ref: "Blog"}]
});

module.exports = User;
