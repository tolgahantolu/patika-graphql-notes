const users = [
  { id: "1", fullname: "Tolgahan Hanoğlu", age: 31 },
  { id: "2", fullname: "Can Cananoğlu", age: 24 },
];

const posts = [
  { id: "1", title: "Tolgahan'in gönderisi", user_id: "1" },
  { id: "2", title: "Tolgahan'in gönderisi", user_id: "1" },
  { id: "3", title: "Can'in gönderisi", user_id: "2" },
];

const comments = [
  { id: "1", text: "Lorem Ipsum dolor sit amet", post_id: "1", user_id: "1" },
  { id: "2", text: "foo bar baz lipsum dolor", post_id: "1", user_id: "2" },
  { id: "3", text: "haha foo dolor var ipsum baz", post_id: "2", user_id: "1" },
];

export default {
  users,
  posts,
  comments,
};
