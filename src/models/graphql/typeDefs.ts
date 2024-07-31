import gql from "graphql-tag";

const typeDefs = gql`
  # //! Types Decelerations
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    roll: String!
    avatar: String!
  }

  type BlogContext {
    id: ID!
    title: String!
    description: String!
    photo: String!
  }
  type VideoBlogContext {
    id: ID!
    title: String!
    url: String!
  }

  # //! Create Query to get the data from Postman/Apollo SandBox
  type Query {
    # //! to fetch multi Data
    users: [User!]!
    blogContexts: [BlogContext!]!
    videoBlogContexts: [VideoBlogContext!]!
    # //! To fetch Single Data by ID
    user(id: ID!): User!
    blogContext(id: ID!): BlogContext!
    videoBlogContext(id: ID!): VideoBlogContext!
  }
  type Mutation {
    #//! To Insert New Data
    addUser(newUserData: AddUserInput): User!
    addBlogContext(newBlogContextData: AddBlogContextInput): BlogContext!
    addVideoBlogContext(newVideoBlogContextData: addVideoBlogContextInput): VideoBlogContext!
    #//! To Edit the Data
    editUser(id: ID!, edits: userEdits): User!
    editBlogContext(id: ID!, edits: blogContextEdits): BlogContext!
    editVideoContext(id: ID!, edits: videoBlogContextEdits): VideoBlogContext!
    #//! To Delete the Data
    deleteUser(id: ID!): User!
    deleteBlogContext(id: ID!): BlogContext!
    deleteVideoContext(id: ID!): VideoBlogContext!
  }
  #//! Inputs of Add Data
  input AddUserInput {
    name: String
    email: String
    password: String
    roll: String
    avatar: String
  }
  input AddBlogContextInput {
    title: String
    description: String
    photo: String
  }
  input addVideoBlogContextInput {
    title: String
    url: String
  }
  #//! Inputs of Edit Data
  input userEdits {
    name: String
    password: String
    roll: String
    avatar: String
  }
  input blogContextEdits {
    title: String
    description: String
    photo: String
  }
  input videoBlogContextEdits {
    title: String
    url: String
  }
`;

export default typeDefs;
