const Post = {
  user: (parent, __, { db }) =>
    db.users.find((user) => user.id === parent.user_id),
  comments: (parent, { db }) =>
    db.comments.filter((comment) => comment.post_id === parent.id),
};

module.exports.Post = Post;
