import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getPosts {
      id
      title
      shortDescription
      user {
        profilePhoto
      }
    }
  }
`;
