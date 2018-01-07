const supertest = require("supertest");
const {app, server} = require("../index");
const api = supertest(app);
const Blog = require("../models/blog");

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

beforeAll(async () => {
  await Blog.remove({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((blog) => blog.title);
  expect(contents).toContain("Web Developer Roadmap 2018");
});

afterAll(() => {
  server.close();
});
