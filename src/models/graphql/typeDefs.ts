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
  }
`;

export default typeDefs;
