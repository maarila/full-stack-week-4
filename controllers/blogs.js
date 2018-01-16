const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const BlogComment = require("../models/blogComment");
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

const formatBlogComment = (blogComment) => {
  return {
    id: blogComment._id,
    blogId: blogComment.blogId,
    comment: blogComment.comment
  };
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    _id: 1,
    username: 1,
    name: 1
  });
  response.json(blogs.map(formatBlog));
});

blogsRouter.get("/comments", async (request, response) => {
  const comments = await BlogComment.find({});
  response.json(comments.map(formatBlogComment));
});

blogsRouter.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(formatNote(note));
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    console.log(exception);
    res.status(400).send({error: "malformatted id"});
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: "token missing or invalid"});
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({error: "content missing"});
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      user: user,
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

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;

  try {
    if (body.comment === undefined) {
      return response.status(400).json({error: "content missing"});
    }

    const blogComment = new BlogComment({
      blogId: request.params.id,
      comment: body.comment
    });

    const savedBlogComment = await blogComment.save();

    response.status(201).json(formatBlogComment(savedBlogComment));
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
    const blogToBeDeleted = await Blog.findById(request.params.id);

    if (blogToBeDeleted.user === undefined) {
      await Blog.findByIdAndRemove(request.params.id);
      return response.status(204).end();
    }

    const blogOriginalUserId = blogToBeDeleted.user.toString();
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || decodedToken.id !== blogOriginalUserId) {
      return response
        .status(401)
        .json({error: "not authorized to remove blog"});
    }

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
      user: body.user,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    }).populate("user", {
      _id: 1,
      username: 1,
      name: 1
    });

    response.json(formatBlog(updatedBlog));
  } catch (exception) {
    console.log(exception);
    response.status(400).send({error: "malformatted id"});
  }
});

module.exports = blogsRouter;
