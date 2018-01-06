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

const mostBlogs = (blogs) => {
  let blogsPerAuthor = [];

  blogs.forEach((blog) => {
    const entryExists = blogsPerAuthor.filter(
      (existing) => existing.author === blog.author
    );

    if (blogsPerAuthor.length > 0 && entryExists.length > 0) {
      const addOneBlog = {
        author: entryExists[0].author,
        blogs: entryExists[0].blogs + 1
      };

      blogsPerAuthor = blogsPerAuthor
        .filter((existingBlog) => existingBlog.author !== blog.author)
        .concat(addOneBlog);
    } else {
      const addNewAuthor = {
        author: blog.author,
        blogs: 1
      };
      blogsPerAuthor = blogsPerAuthor.concat(addNewAuthor);
    }
  });
  return blogsPerAuthor.reduce((a, b) => {
    return a.blogs > b.blogs ? a : b;
  }, []);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
};
