const { GraphQLServer, PubSub } = require("graphql-yoga");
const resolvers = require("./graphql/resolvers");
const db = require("./data");
const typeDefs = require("./graphql/typeDefs");

const pubsub = new PubSub(); // websocket'e bunun sayesinde erişiyoruz
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub, db },
});

server.start(() => console.log("Server is running on localhost:4000"));
