import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    getUsers {
      id
      fullname
    }
  }
`;

export const ADD_NEW_POST = gql`
  mutation addNewPost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      user_id
      user {
        id
        fullname
      }
      cover
      shortDescription
    }
  }
`;
