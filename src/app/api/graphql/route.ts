import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";
import { NextRequest } from "next/server";
import typeDefs from "@/models/graphql/typeDefs";
import resolvers from "@/models/graphql/resolvers";

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

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
