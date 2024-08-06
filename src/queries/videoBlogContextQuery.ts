import { gql } from "@apollo/client";

export const VIDEO_BLOG_CONTEXT = gql`
  query videoBlogContexts {
    videoBlogContexts {
      _id
      title
      url
    }
  }
`;

export const GET_VIDEO_BLOG_BY_ID = gql`
  query VideoBlogContextById($videoId: ID!) {
    videoBlogContext(id: $videoId) {
      _id
      title
      url
    }
  }
`;

export const UPDATE_VIDEO_CONTEXT = gql`
  mutation EditVideoContext($editVideoContextId: ID!, $edits: videoBlogContextEdits) {
    editVideoContext(id: $editVideoContextId, edits: $edits) {
      _id
      title
      url
    }
  }
`;

export const INSERT_VIDEO_CONTEXT = gql`
  mutation AddVideoBlogContext($newVideoBlogContextData: addVideoBlogContextInput) {
    addVideoBlogContext(newVideoBlogContextData: $newVideoBlogContextData) {
      title
      url
    }
  }
`;

export const DELETE_VIDEO_CONTEXT = gql`
  mutation DeleteVideoContextById($deleteVideoContextId: ID!) {
    deleteVideoContext(id: $deleteVideoContextId) {
      _id
      title
      url
    }
  }
`;
