const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((a, b) => {
    return a + b;
  }, 0);
};

const favouriteBlog = (blogs) => {
  const favourite = blogs.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  }, []);

  if (favourite.title) {
    const newBlog = {
      title: favourite.title,
      author: favourite.author,
      likes: favourite.likes
    };
    return newBlog;
  }

  return [];
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
