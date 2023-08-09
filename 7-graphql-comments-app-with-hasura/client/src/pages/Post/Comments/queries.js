import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      fullname
    }
  }
`;

export const ADD_NEW_COMMENT = gql`
  mutation addNewComment($input: comments_insert_input!) {
    insert_comments_one(object: $input) {
      id
      text
    }
  }
`;

//export const ADD_NEW_COMMENT = gql`
//  mutation addNewComment($data: CreateCommentInput!) {
//    createComment(data: $data) {
//      id
//    }
//  }
//`;
