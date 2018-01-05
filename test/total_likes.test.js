const listHelper = require("../utils/list_helper");

describe("total likes", () => {
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

  test("when the list is empty, likes equal zero", () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has many blogs the likes equal the sum of all likes", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(15);
  });
});
