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

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
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

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "So you want to be a wizard",
    author: "Julia Evans",
    url: "https://speakerdeck.com/jvns/so-you-want-to-be-a-wizard/",
    likes: 3
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((blog) => blog.title);
  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(contents).toContain("So you want to be a wizard");
});

test("if the likes of a blog are undefined they are set to zero", async () => {
  const newBlog = {
    title: "Pagination in Web Forms",
    author: "Janet M. Six",
    url:
      "https://www.uxmatters.com/mt/archives/2010/03/pagination-in-web-forms-evaluating-the-effectiveness-of-web-forms.php"
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const likelessBlog = response.body.filter(
    (blog) => blog.title === "Pagination in Web Forms"
  );
  expect(likelessBlog[0].likes).toBe(0);
});

afterAll(() => {
  server.close();
});
