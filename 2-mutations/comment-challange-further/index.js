const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { nanoid } = require("nanoid");
const { users, posts, comments } = require("./data");

const typeDefs = gql`
  type User {
    id: ID!
    fullname: String!
    posts: [Post!]!
    comments: [Comment!]
  }

  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: Post!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User!
    getPosts: [Post!]!
    getPost(id: ID!): Post!
    getComments: [Comment!]!
    getComment(id: ID!): Comment!
  }

  type Mutation {
    createUser(fullname: String!): User!
    createPost(title: String!, user_id: ID!): Post!
    createComment(text: String!, post_id: ID!, user_id: ID!): Comment!
  }
`;

const resolvers = {
  Mutation: {
    createUser: (parent, { fullname }) => {
      const user = { id: nanoid(), fullname };
      users.push(user);
      return user;
    },
    createPost: (_, { title, user_id }) => {
      const post = { id: nanoid(), title, user_id };
      posts.push(post);
      return post;
    },
    createComment: (_, { text, post_id, user_id }) => {
      const comment = { id: nanoid(), text, post_id, user_id };
      comments.push(comment);
      return comment;
    },
  },
  Query: {
    getUsers: () => users,
    getUser: (_, { id }) => users.find((user) => user.id === id),
    getPosts: () => posts,
    getPost: (_, { id }) => posts.find((post) => post.id === id),
    getComments: () => comments,
    getComment: (_, { id }) => comments.find((comment) => comment.id === id),
  },
  User: {
    posts: (parent, args) => posts.filter((post) => post.user_id === parent.id),
    comments: (parent, args) =>
      comments.filter((comment) => comment.user_id === parent.id),
  },
  Post: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    comments: (parent, args) =>
      comments.filter((comment) => comment.post_id === parent.id),
  },
  Comment: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    post: (parent, args) => posts.find((post) => post.id === parent.post_id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
