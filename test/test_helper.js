const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    id: "5a55018f038c146320df2190",
    user: {
      _id: "5a550161038c146320df218f",
      username: "ounou",
      name: "Taichi Ounou"
    },
    likes: 17,
    author: "Me Myself",
    title: "A Glorious Beginning",
    url: "http://www.reactjs.com",
    comments: []
  },
  {
    id: "5a550298bb9a4e635705bdc6",
    user: {
      _id: "5a550247038c146320df2192",
      username: "bond",
      name: "James Bond"
    },
    likes: 11,
    author: "Maxwell Smart",
    title: "Secret Agent - A Life Of",
    url: "http://www.helsinki.fi",
    comments: []
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
