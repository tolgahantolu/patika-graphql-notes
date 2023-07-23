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

  input CreateUserInput {
    fullname: String!
  }

  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]
  }

  input CreatePostInput {
    title: String!
    user_id: ID!
  }

  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: Post!
  }

  input CreateCommentInput {
    text: String!
    post_id: ID!
    user_id: ID!
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
    createUser(data: CreateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
  }
`;

const resolvers = {
  Mutation: {
    createUser: (parent, { data }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      return user;
    },
    createPost: (_, { data }) => {
      const post = { id: nanoid(), ...data };
      posts.push(post);
      return post;
    },
    createComment: (_, { data }) => {
      const comment = { id: nanoid(), ...data };
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
