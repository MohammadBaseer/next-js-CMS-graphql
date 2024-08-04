import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query BlogContextByID($blogContextId: ID!) {
    blogContext(id: $blogContextId) {
      id
      title
      description
      photo
    }
  }
`;

export const GET_USERS_BY_ID = gql`
  query userByID($userId: ID!) {
    user(id: $userId) {
      id
      email
      name
      roll
      avatar
    }
  }
`;

export const UPDATE_USERS = gql`
  mutation EditUser($editUserId: ID!, $edits: userEdits) {
    editUser(id: $editUserId, edits: $edits) {
      name
      password
      roll
      avatar
    }
  }
`;

export const INSERT_USERS = gql`
  mutation AddNewUser($newUserData: AddUserInput) {
    addUser(newUserData: $newUserData) {
      name
      email
      password
      roll
      avatar
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUserById($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
      name
      email
      password
      roll
      avatar
    }
  }
`;
