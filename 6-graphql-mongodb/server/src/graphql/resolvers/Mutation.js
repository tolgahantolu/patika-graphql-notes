import { nanoid } from "nanoid";

export const Mutation = {
  createUser: async (_, { data }, context) => {
    const newUser = new context._db.User({
      ...data,
    });

    const user = await newUser.save();

    context.pubsub.publish("userCreated", { userCreated: user });
    return user;
  },
  updateUser: async (_, { id, data }, context) => {
    const isUserExist = await context._db.User.findById(id);

    if (!isUserExist) throw new Error("User not found!");

    const updatedUser = await context._db.User.findByIdAndUpdate(id, data, {
      new: true,
    });

    context.pubsub.publish("userUpdated", { userUpdated: updatedUser });

    return updatedUser;
  },
  deleteUser: async (_, { id }, context) => {
    const isUserExist = await context._db.User.findById(id);

    if (!isUserExist) throw new Error("User not found!");

    const deletedUser = await context._db.User.findByIdAndDelete(id);

    context.pubsub.publish("userDeleted", { userDeleted: deletedUser });

    return deletedUser;
  },
  deleteAllUsers: async (_, __, context) => {
    const deleteUsers = await context._db.User.deleteMany({});

    return {
      count: deleteUsers.deletedCount,
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
