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
    _id: ID!
    title: String!
    description: String!
    photo: Picture!
  }
  type VideoBlogContext {
    id: ID!
    title: String!
    url: String!
  }
  type Picture {
    url: String!
    public_id: String
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
    # ///REVIEW - //! Test for upload the file

    #//! To Edit the Data
    editUser(id: ID!, edits: userEdits): User!
    editBlogContext(id: ID!, edits: blogContextEdits): BlogContext!
    editVideoContext(id: ID!, edits: videoBlogContextEdits): VideoBlogContext!

    # uploadAvatar(file: Upload!): User!
    # uploadAvatar(file: Upload!): String
    # uploadAvatar(file: Upload!): File!
    # uploadAvatar: User

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
  # //! ----------------------
  input AddBlogContextInput {
    title: String
    description: String
    photo: Pic
  }
  input blogContextEdits {
    title: String
    description: String
    photo: Pic
  }
  input Pic {
    url: String!
    public_id: String
  }
  # //! --------------------
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
  input videoBlogContextEdits {
    title: String
    url: String
  }
`;

export default typeDefs;
