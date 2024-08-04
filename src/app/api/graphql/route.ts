import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";
import { NextRequest } from "next/server";
import typeDefs from "@/models/graphql/typeDefs";
import resolvers from "@/models/graphql/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
// const { GraphQLUpload } = require("graphql-upload");
// const resolvers = {
//   Query: {
//     hello: () => "world",
//   },
// };

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
//
//
const schema = makeExecutableSchema({ typeDefs, resolvers });
//

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false, // Disable built-in uploads handling
  csrfPrevention: false, // Disable CSRF prevention (for testing purposes)
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };

// const typeDefs = `
//   scalar Upload

//   type User {
//     id: ID!
//     name: String!
//     email: String!
//     avatar: String
//   }

//   type Mutation {
//     uploadAvatar(file: Upload!): User!
//   }
// `;

// const resolvers = {
//   Upload: GraphQLUpload,
//   Mutation: {
//     uploadAvatar: async (_, { file }) => {
//       const { createReadStream, filename, mimetype, encoding } = await file;
//       // Handle the file upload logic here
//       // For example, save the file to the server or cloud storage
//       return {
//         id: "1",
//         name: "John Doe",
//         email: "john.doe@example.com",
//         avatar: filename,
//       };
//     },
//   },
// };

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// const server = new ApolloServer({
//   schema,
//   uploads: false, // Disable built-in upload handling
//   context: ({ req }) => ({ req }),
// });

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
