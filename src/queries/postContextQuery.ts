import { gql } from "@apollo/client";

export const GET_POST_CONTEXT = gql`
  query BlogContexts {
    blogContexts {
      _id
      title
      description
      photo {
        url
        public_id
      }
    }
  }
`;

export const GET_POST_CONTEXT_BY_ID = gql`
  query BlogContext($blogContextId: ID!) {
    blogContext(id: $blogContextId) {
      _id
      title
      description
      photo {
        url
        public_id
      }
    }
  }
`;

export const UPDATE_POST_CONTEXT = gql`
  mutation EditBlogContext($editBlogContextId: ID!, $edits: blogContextEdits) {
    editBlogContext(id: $editBlogContextId, edits: $edits) {
      _id
      title
      description
      photo {
        url
        public_id
      }
    }
  }
`;

export const INSERT_POST_CONTEXT = gql`
  mutation AddBlogContext($newBlogContextData: AddBlogContextInput) {
    addBlogContext(newBlogContextData: $newBlogContextData) {
      _id
      title
      description
      photo {
        url
        public_id
      }
    }
  }
`;

export const DELETE_POST_CONTEXT = gql`
  mutation DeleteBlogContext($deleteBlogContextId: ID!) {
    deleteBlogContext(id: $deleteBlogContextId) {
      _id
      title
      description
      photo {
        url
        public_id
      }
    }
  }
`;
