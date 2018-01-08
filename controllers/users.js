const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult
  };
};

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users.map(formatUser));
});

usersRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      passwordHash,
      name: body.name,
      adult: body.adult
    });

    const savedUser = await user.save();

    res.json(formatUser(savedUser));
  } catch (exception) {
    console.log(exception);
    res.status(500).json({error: "something went wrong..."});
  }
});

module.exports = usersRouter;
