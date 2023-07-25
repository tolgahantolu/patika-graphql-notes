import { nanoid } from "nanoid";

export const Mutation = {
  createUser: (_, { data }, context) => {
    const user = { id: nanoid(), ...data };
    context.db.users.push(user);
    context.pubsub.publish("userCreated", { userCreated: user });
    return user;
  },
  updateUser: (_, { id, data }, context) => {
    const userIndex = context.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error("User not found!");

    const updatedUser = (context.db.users[userIndex] = {
      ...context.db.users[userIndex],
      ...data,
    });

    context.pubsub.publish("userUpdated", { userUpdated: updatedUser });

    return updatedUser;
  },
  deleteUser: (_, { id }, context) => {
    const userIndex = context.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error("User not found!");
    const deletedUser = context.db.users[userIndex];
    context.db.users.splice(userIndex, 1);

    context.pubsub.publish("userDeleted", { userDeleted: deletedUser });

    return deletedUser;
  },
  deleteAllUsers: () => {
    const length = context.db.users.length;
    context.db.users.splice(0, length);

    return {
      count: length,
    };
  },
  createPost: (_, { data }, context) => {
    const post = { id: nanoid(), ...data };
    context.db.posts.push(post);
    return post;
  },
  updatePost: (_, { id, data }, context) => {
    const postIndex = context.db.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) throw new Error("Post not found!");
    const updatedPost = (context.db.posts[postIndex] = {
      ...context.db.posts[postIndex],
      ...data,
    });

    return updatedPost;
  },
  deletePost: (_, { id }, context) => {
    const postIndex = context.db.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) throw new Error("Post not found!");
    const deletedPost = context.db.posts[postIndex];
    context.db.posts.splice(postIndex, 1);
    return deletedPost;
  },
  deleteAllPosts: (_, __, context) => {
    const length = context.db.posts.length;
    context.db.posts.splice(0, length);

    return {
      count: length,
    };
  },
  createComment: (_, { data }, context) => {
    const comment = { id: nanoid(), ...data };
    context.db.comments.push(comment);
    return comment;
  },
  updateComment: (_, { id, data }, context) => {
    const commentIndex = context.db.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex === -1) throw new Error("Comment not found!");
    const updatedComment = (context.db.comments[commentIndex] = {
      ...context.db.comments[commentIndex],
      ...data,
    });

    return updatedComment;
  },
  deleteComment: (_, { id }, context) => {
    const commentIndex = context.db.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex === -1) throw new Error("Comment not found!");
    const deletedComment = context.db.comments[commentIndex];
    context.db.comments.splice(commentIndex, 1);
    return deletedComment;
  },
  deleteAllComments: () => {
    const length = context.db.comments.length;
    context.db.comments.splice(0, length);

    return {
      count: length,
    };
  },
};
