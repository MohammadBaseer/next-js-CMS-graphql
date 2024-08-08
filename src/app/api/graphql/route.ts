import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import typeDefs from "@/models/graphql/typeDefs";
import resolvers from "@/models/graphql/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import connectMongoDB from "@/config/connectDB";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
});

(async function () {
  await connectMongoDB();
})();

// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//   context: async (req) => ({ req }),
// });\

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({
    authToken: req.headers.get("authorization"),
  }),
});

export { handler as GET, handler as POST };
