import { gql } from "@apollo/client";

export const GET_POST = gql`
  query getPost($id: Int!) {
    posts_by_pk(id: $id) {
      id
      title
      description
      cover
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getComments($id: Int!) {
    posts_by_pk(id: $id) {
      posts_comments {
        id
        text
        comments_user {
          fullname
          profilePhoto
        }
      }
    }
  }
`;
