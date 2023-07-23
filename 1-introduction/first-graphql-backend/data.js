const authors = [
  {
    id: "1",
    name: "Albert",
    surname: "Camus",
    age: 62,
  },
  {
    id: "2",
    name: "Tolga",
    surname: "Han",
    age: 27,
  },
];

const books = [
  {
    id: "1",
    title: "Yabancı",
    author_id: "2",
    rate: 6.4,
    isPublished: true,
  },
  {
    id: "2",
    title: "Test Book",
    author_id: "2",
    rate: 8.1,
    isPublished: true,
  },
];

module.exports = { authors, books };
