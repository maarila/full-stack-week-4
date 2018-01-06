const listHelper = require("../utils/list_helper");

describe("most blogs", () => {
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
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Web Dev for 2016",
      author: "Kamran Ahmed",
      url: "https://github.com/kamranahmedse/developer-roadmap",
      likes: 7,
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

  test("when the list of blogs is empty most blogs returns an empty object", () => {
    const result = listHelper.mostBlogs(emptyList);
    expect(result).toEqual([]);
  });

  test("when the list contains one blog, most blogs returns its author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result.author).toBe("Edsger W. Dijkstra");
    expect(result.blogs).toBe(1);
  });

  test("when the list has many blogs, most blogs returns the author with most blogs", () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result.author).toBe("Kamran Ahmed");
    expect(result.blogs).toBe(3);
  });
});
