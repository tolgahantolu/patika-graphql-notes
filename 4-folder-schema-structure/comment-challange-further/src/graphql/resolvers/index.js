//const Query = require("./Query");
//const Mutation = require("./Mutation");
//const Subscription = require("./Subscription");
//const User = require("./User");
//const Post = require("./Post");
//const Comment = require("./Comment");
//
//module.exports = {
//  Query,
//  Mutation,
//  Subscription,
//  User,
//  Post,
//  Comment,
//};

const path = require("path");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolversArray = loadFilesSync(path.join(__dirname), {
  extensions: ["js"],
});

module.exports = mergeResolvers(resolversArray);
