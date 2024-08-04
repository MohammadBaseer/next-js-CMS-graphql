import { gql } from "@apollo/client";

export const VIDEOBLOGCONTEXT = gql`
  query videoBlogContexts {
    videoBlogContexts {
      id
      title
      url
    }
  }
`;

export const GETVIDEOBLOGBYID = gql`
  query VideoBlogContextById($videoId: ID!) {
    videoBlogContext(id: $videoId) {
      id
      title
      url
    }
  }
`;

export const UPDATEVIDEOCONTEXT = gql`
  mutation EditVideoContext($editVideoContextId: ID!, $edits: videoBlogContextEdits) {
    editVideoContext(id: $editVideoContextId, edits: $edits) {
      title
      url
    }
  }
`;

export const INSERTVIDEOCONTEXT = gql`
  mutation AddVideoBlogContext($newVideoBlogContextData: addVideoBlogContextInput) {
    addVideoBlogContext(newVideoBlogContextData: $newVideoBlogContextData) {
      title
      url
    }
  }
`;

export const DELETEVIDECONTEXT = gql`
  mutation DeleteVideoContextById($deleteVideoContextId: ID!) {
    deleteVideoContext(id: $deleteVideoContextId) {
      id
      title
      url
    }
  }
`;
