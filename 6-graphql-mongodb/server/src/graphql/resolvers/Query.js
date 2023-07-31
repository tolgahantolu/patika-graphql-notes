export const Query = {
  getUsers: (_, __, { db }) => db.users,
  getUser: (_, { id }, { db }) => db.users.find((user) => user.id === id),
  getPosts: (_, __, { db }) => db.posts,
  getPost: (_, { id }, { db }) => db.posts.find((post) => post.id === id),
  getComments: (_, __, { db }) => db.comments,
  getComment: (_, { id }, { db }) =>
    db.comments.find((comment) => comment.id === id),
};
