const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());

const mongoUrl = "mongodb://localhost/bloglist";

mongoose.connect(config.mongoUrl);
mongoose.Promise = global.Promise;

app.use(middleware);

const loginRouter = require("./controllers/login");
app.use("/api/login", loginRouter);

const usersRouter = require("./controllers/users");
app.use("/api/users", usersRouter);

const blogsRouter = require("./controllers/blogs");
app.use("/api/blogs", blogsRouter);

const PORT = process.env.PORT || config.port;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("close", () => {
  mongoose.connection.close();
});

module.exports = {
  app,
  server
};
