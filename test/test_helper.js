const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Web Developer Roadmap 2018",
    author: "Kamran Ahmed",
    url: "https://github.com/kamranahmedse/developer-roadmap",
    likes: 7
  }
];

const nonExistingId = async () => {
  const blog = new Blog();
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
};
