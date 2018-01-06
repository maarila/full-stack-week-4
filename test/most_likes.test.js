const listHelper = require("../utils/list_helper");

describe("most likes", () => {
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
      _id: "5a422aa71b54a676234d17f1",
      title: "Roadmap 2017",
      author: "Kamran Ahmed",
      url: "https://github.com/kamranahmedse/developer-roadmap",
      likes: 4,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Web Dev for 2016",
      author: "Edsger W. Dijkstra",
      url: "https://github.com/kamranahmedse/developer-roadmap",
      likes: 4,
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

  test("when the list of blogs is empty most liked returns an empty array", () => {
    const result = listHelper.mostLikes(emptyList);
    expect(result).toEqual([]);
  });

  test("when the list of blogs contains a single item most liked is said blogs author", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result.author).toBe("Edsger W. Dijkstra");
    expect(result.likes).toBe(5);
  });

  test("when list contains many blogs most liked returns the author with most likes", () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result.author).toBe("Kamran Ahmed");
    expect(result.likes).toBe(11);
  });
});
