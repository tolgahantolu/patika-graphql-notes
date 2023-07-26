const users = [
  {
    id: "1",
    fullname: "Tolgahan Hanoğlu",
    profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
    age: 31,
  },
  {
    id: "2",
    fullname: "Can Cananoğlu",
    profilePhoto: "https://randomuser.me/api/portraits/men/70.jpg",
    age: 24,
  },
];

const posts = [
  {
    id: "1",
    title: "Tolgahan'in gönderisi",
    description:
      "ne değişik bi şey bu... lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    user_id: "1",
  },
  {
    id: "2",
    title: "Tolgahan'in gönderisi",
    description:
      "kendimi çok değişik hissediyorum artik, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    user_id: "1",
  },
  {
    id: "3",
    title: "Can'in gönderisi",
    description:
      "kitap okumak ve kod yazmak çok güzel ve eğlenceli, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    user_id: "2",
  },
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
