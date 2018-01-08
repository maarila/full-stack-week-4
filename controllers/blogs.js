const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const formatBlog = (blog) => {
  return {
    id: blog._id,
    user: blog.user,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  };
};

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    _id: 1,
    username: 1,
    name: 1
  });
  response.json(blogs.map(formatBlog));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  try {
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({error: "token missing or invalid"});
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({error: "content missing"});
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      user: user._id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(formatBlog(savedBlog));
  } catch (exception) {
    if (exception.name === "JsonWebTokenError") {
      response.status(401).json({error: exception.message});
    } else {
      console.log(exception);
      response.status(500).json({error: "something went wrong"});
    }
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    console.log(exception);
    response.status(400).send({error: "malformatted id"});
  }
});

blogsRouter.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });

    response.json(formatBlog(updatedBlog));
  } catch (exception) {
    console.log(exception);
    response.status(400).send({error: "malformatted id"});
  }
});

module.exports = blogsRouter;
