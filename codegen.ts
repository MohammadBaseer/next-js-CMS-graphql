import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  // schema: "./src/models/graphql/typeDefs.ts",
  generates: {
    "./src/graphql/__generated__/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;

