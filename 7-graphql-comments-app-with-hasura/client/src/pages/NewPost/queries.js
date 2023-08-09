import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      fullname
    }
  }
`;

export const ADD_NEW_POST = gql`
  mutation addNewPost($input: posts_insert_input!) {
    insert_posts_one(object: $input) {
      id
      title
      posts_user {
        id
        fullname
      }
      cover
      shortDescription
    }
  }
`;

//export const ADD_NEW_POST = gql`
//  mutation addNewPost($data: CreatePostInput!) {
//    createPost(data: $data) {
//      id
//      title
//      user {
//        id
//        fullname
//      }
//      cover
//      shortDescription
//    }
//  }
//`;
