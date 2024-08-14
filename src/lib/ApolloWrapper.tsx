"use client";
import { useEffect, useState } from "react";
import { ApolloLink, HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

function createApolloClient(token: string | null) {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    fetchOptions: { cache: "no-store" },
  });

  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token");
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const newClient = createApolloClient(token);
    setClient(newClient);

    const handleStorageChange = () => {
      setClient(createApolloClient(localStorage.getItem("token")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!client) {
    return null; // or a loading spinner
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
