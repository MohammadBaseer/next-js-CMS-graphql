import gql from "graphql-tag";

const typeDefs = gql`
  # //! Types Declarations

  enum RoleSet {
    Admin
    Editor
    User
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    role: RoleSet #after development set it to '!'
    avatar: Picture!
    createdAt: String
    updatedAt: String
    token: String!
  }

  type BlogContext {
    _id: ID!
    title: String!
    description: String!
    createdBy: CreatedByUser!
    photo: Picture!
    createdAt: String
    updatedAt: String
  }
  type VideoBlogContext {
    _id: ID!
    title: String!
    url: String!
    createdBy: CreatedByUser!
    createdAt: String
    updatedAt: String
  }
  type Picture {
    url: String!
    public_id: String
  }
  type CreatedByUser {
    id: ID
    username: String!
  }

  type EditUserResponse {
  result: User!
  refreshToken: String!
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
    # //! Login User
    loginUser(inputData: LoginInput!): User!
    #//! To Insert New Data
    addUser(newUserData: AddUserInput): User!

    addBlogContext(newBlogContextData: AddBlogContextInput): BlogContext!

    addVideoBlogContext(newVideoBlogContextData: addVideoBlogContextInput): VideoBlogContext!

    #//! To Edit the Data
    # editUser(id: ID!, edits: userEdits): User!
    editUser(id: ID!, edits: userEdits): EditUserResponse!
    editBlogContext(id: ID!, edits: blogContextEdits): BlogContext!
    editVideoContext(id: ID!, edits: videoBlogContextEdits): VideoBlogContext!

    #//! To Delete the Data
    deleteUser(id: ID!): User!
    deleteBlogContext(id: ID!): BlogContext!
    deleteVideoContext(id: ID!): VideoBlogContext!
  }
  # //! ==== Login User Input
  input LoginInput {
    email: String!
    password: String!
  }
  #//! Inputs of Add Data
  input AddUserInput {
    name: String
    email: String
    password: String
    role: String
    avatar: Pic
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
 
  # //! --------------------
  input addVideoBlogContextInput {
    title: String
    url: String
  }
  #//! Inputs of Edit Data
  input userEdits {
    name: String
    password: String
    role: String
    avatar: Pic
  }
  
   input Pic {
    url: String
    public_id: String
  }
  input videoBlogContextEdits {
    title: String
    url: String
  }
`;

export default typeDefs;
