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
