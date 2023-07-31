export const Query = {
  getUsers: async (_, __, { _db }) => {
    const users = await _db.User.find();
    return users;
  },
  getUser: async (_, { id }, { _db }) => {
    const user = await _db.User.findById(id);
    return user;
  },
  getPosts: (_, __, { db }) => db.posts,
  getPost: (_, { id }, { db }) => db.posts.find((post) => post.id === id),
  getComments: (_, __, { db }) => db.comments,
  getComment: (_, { id }, { db }) =>
    db.comments.find((comment) => comment.id === id),
};
