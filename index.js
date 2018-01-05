const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

app.use(cors());
app.use(bodyParser.json());

const mongoUrl =
  "mongodb://blogilistadev:dev44j41@ds239217.mlab.com:39217/blogilista-dev";
mongoose.connect(mongoUrl);
mongoose.Promise = global.Promise;

const blogsRouter = require("./controllers/blogs");
app.use("/api/blogs", blogsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
