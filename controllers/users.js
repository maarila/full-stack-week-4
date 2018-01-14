const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs
  };
};

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    _id: 1,
    likes: 1,
    title: 1,
    author: 1,
    url: 1
  });
  res.json(users.map(formatUser));
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(formatNote(note));
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    console.log(exception);
    res.status(400).send({error: "malformatted id"});
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (body.username.length < 3 || body.password.length < 3) {
      return res
        .status(400)
        .json({error: "username and password must have at least 3 characters"});
    }

    const existingUser = await User.find({username: body.username});

    if (existingUser.length > 0) {
      return res.status(400).json({error: "username must be unique"});
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      password: passwordHash,
      name: body.name,
      adult: body.adult || true
    });

    const savedUser = await user.save();

    res.json(formatUser(savedUser));
  } catch (exception) {
    console.log(exception);
    res.status(500).json({error: "something went wrong..."});
  }
});

module.exports = usersRouter;
