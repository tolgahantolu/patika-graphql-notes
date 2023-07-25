import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from "@resolvers";
import db from "./data";
import typeDefs from "@typeDefs";

const pubsub = new PubSub(); // websocket'e bunun sayesinde erişiyoruz
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub, db },
});

server.start(() => console.log("Server is running on localhost:4000"));
