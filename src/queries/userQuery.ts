import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($inputData: LoginInput!) {
    loginUser(inputData: $inputData) {
      name
      email
      password
      avatar {
        url
      }
      token
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      _id
      name
      email
      role
      avatar {
        url
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS_BY_ID = gql`
  query userByID($userId: ID!) {
    user(id: $userId) {
      _id
      name
      email
      role
      avatar {
        url
      }
      createdAt
    }
  }
`;

export const UPDATE_USERS = gql`
  mutation EditUser($editUserId: ID!, $edits: userEdits) {
    editUser(id: $editUserId, edits: $edits) {
      name
      password
      role
      avatar {
        url
        public_id
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation AddNewUser($newUserData: AddUserInput) {
    addUser(newUserData: $newUserData) {
      name
      email
      avatar {
        url
      }
      _id
      createdAt
      token
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUserById($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      _id
      name
      email
      role
      avatar {
        url
      }
    }
  }
`;
