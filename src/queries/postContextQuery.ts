import { gql } from "@apollo/client";

export const GET_POST_CONTEXT = gql`
  query BlogContexts {
    blogContexts {
      id
      title
      photo
    }
  }
`;

export const GET_POST_CONTEXT_BY_ID = gql`
  query BlogContextByID($blogContextId: ID!) {
    blogContext(id: $blogContextId) {
      id
      title
      description
      photo
    }
  }
`;

export const UPDATE_POST_CONTEXT = gql`
  mutation EditBlogContext($editBlogContextId: ID!, $edits: blogContextEdits) {
    editBlogContext(id: $editBlogContextId, edits: $edits) {
      title
      description
      photo
    }
  }
`;

export const INSERT_POST_CONTEXT = gql`
  mutation AddNewBlogContext($newBlogContextData: AddBlogContextInput) {
    addBlogContext(newBlogContextData: $newBlogContextData) {
      title
      description
      photo
    }
  }
`;

export const DELETE_POST_CONTEXT = gql`
  mutation DeleteBlogContext($deleteBlogContextId: ID!) {
    deleteBlogContext(id: $deleteBlogContextId) {
      id
      title
      description
      photo
    }
  }
`;
