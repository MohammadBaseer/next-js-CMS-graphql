// import { ApolloLink, concat, HttpLink } from "@apollo/client";
// import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";

// function makeClient() {
//   const httpLink = new HttpLink({
//     uri: "api/graphql",
//     fetchOptions: { cache: "no-store" },
//   });

//   const token = localStorage.getItem("token");

//   const authLink = new ApolloLink((operation, forward) => {
//     if (token) {
//       operation.setContext({
//         headers: {
//           authorization: token ? `Bearer ${token}` : null,
//         },
//       });
//     }
//     return forward(operation);
//   });

//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: authLink.concat(httpLink),
//   });
// }

// export function ApolloWrapper({ children }: React.PropsWithChildren) {
//   return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
// }

"use client";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { cache, ReactNode } from "react";

let apolloClient: ApolloClient<any> | undefined;

function makeClient() {
  const httpLink = new HttpLink({ uri: "http://localhost:3000/api/graphql", fetchOptions: { cache: "no-store" } });

  // Handle `localStorage` only in the browser
  let token: string | null;
  if (typeof window === "undefined") {
    console.log("WINDOW UNDEFINED");
    token = null;
  }
  if (typeof window !== "undefined") {
    console.log("WINDOW DEFINED");
    token = localStorage.getItem("token");
  }

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        // authorization: "Bearer " + localStorage.getItem("token") || null,
        // authorization: "Bearer " + token || null,

        authorization: typeof window === "undefined" ? null : "Bearer " + token,
      },
    }));

    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = makeClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
