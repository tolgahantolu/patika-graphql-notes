import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    getUsers {
      id
      fullname
    }
  }
`;

export const ADD_NEW_COMMENT = gql`
  mutation addNewComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      id
    }
  }
`;
