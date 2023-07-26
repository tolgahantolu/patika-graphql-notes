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
    cover:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "Tolgahan'in gönderisi",
    description:
      "kendimi çok değişik hissediyorum artik, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    user_id: "1",
    cover:
      "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
  },
  {
    id: "3",
    title: "Can'in gönderisi",
    description:
      "kitap okumak ve kod yazmak çok güzel ve eğlenceli, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    user_id: "2",
    cover:
      "https://images.unsplash.com/photo-1516417156595-3ca5df62a3a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGRlc2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
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
