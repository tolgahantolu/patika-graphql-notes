import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const resolversArray = loadFilesSync(path.join(__dirname), {
  extensions: ["js"],
});

module.exports = mergeResolvers(resolversArray);
