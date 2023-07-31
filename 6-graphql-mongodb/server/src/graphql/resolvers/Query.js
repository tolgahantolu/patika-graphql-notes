export const Query = {
  getUsers: async (_, __, { _db }) => {
    const users = await _db.User.find();
    return users;
  },
  getUser: async (_, { id }, { _db }) => {
    const user = await _db.User.findById(id);
    return user;
  },
  getPosts: async (_, __, { _db }) => {
    const posts = await _db.Post.find();
    return posts;
  },
  getPost: async (_, { id }, { _db }) => {
    const post = await _db.Post.findById(id);
    return post;
  },
  getComments: async (_, __, { _db }) => {
    const comments = await _db.Comment.find();
    return comments;
  },
  getComment: async (_, { id }, { _db }) => {
    const comment = await _db.Comment.findById(id);
    return comment;
  },
};
