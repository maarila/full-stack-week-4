const listHelper = require("../utils/list_helper");

describe("favourite blog", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ];

  const listWithManyBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Web Developer Roadmap 2018",
      author: "Kamran Ahmed",
      url: "https://github.com/kamranahmedse/developer-roadmap",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17fa",
      title: "UI/UX Designer Roadmap 2017",
      author: "Togi D",
      url: "https://github.com/togiberlin/ui-ux-designer-roadmap",
      likes: 3,
      __v: 0
    }
  ];

  test("when list of blogs is empty favourite blog returns an empty array", () => {
    const result = listHelper.favouriteBlog(emptyList);
    expect(result).toEqual([]);
  });

  test("when list of blogs has one item returns said blog", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    expect(result.title).toBe("Go To Statement Considered Harmful");
  });

  test("when given a larger list of blogs returns the one with the most likes", () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs);
    expect(result.title).toBe("Web Developer Roadmap 2018");
  });
});
