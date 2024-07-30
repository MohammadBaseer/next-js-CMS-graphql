import gql from "graphql-tag";

const typeDefs = gql`
  # //! Types Decelerations
  type Users {
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
    user: [Users!]!
    blogContext: [BlogContext!]!
    videoBlogContext: [VideoBlogContext!]!
  }
`;

export default typeDefs;
