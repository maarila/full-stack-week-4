const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  password: String,
  name: String,
  adult: Boolean
});

module.exports = User;
