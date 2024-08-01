import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/models/graphql/typeDefs.ts",
  generates: {
    "./src/graphql/__generated__/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
