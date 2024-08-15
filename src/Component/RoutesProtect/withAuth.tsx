"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

function withAuth(WrappedComponent: any) {
  return (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    useLayoutEffect(() => {
      checkAuthStatus();

      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === "token") {
          checkAuthStatus();
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, [router]);

    if (!isAuthenticated) {
      return null; // Or a loading spinner until authentication is confirmed
    }

    return <WrappedComponent {...props} />;
  };
}

// withAuth.displayName = "withAuth";
export default withAuth;
