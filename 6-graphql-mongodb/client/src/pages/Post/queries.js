import { gql } from "@apollo/client";

export const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      description
      cover
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getComments($id: ID!) {
    getPost(id: $id) {
      comments {
        id
        text
        user {
          fullname
          profilePhoto
        }
      }
    }
  }
`;
