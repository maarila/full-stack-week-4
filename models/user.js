const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  passwordHash: String,
  name: String,
  adult: Boolean
});

module.exports = User;
