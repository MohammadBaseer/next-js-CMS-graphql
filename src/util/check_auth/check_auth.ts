import { AuthenticationError } from "apollo-server-errors";
import Jwt from "jsonwebtoken";

export const authContext = (context: any) => {
  const authHeader = context.authToken;
  if (authHeader) {
    console.log("Authorization Header:::^^^^^::> ", authHeader);

    const token = authHeader.split("Bearer ")[1];
    if (token) {
      console.log("token in checkAuth", token);
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
      try {
        const user = Jwt.verify(token, secret);
        console.log("user", user);
        return user;
      } catch (error: any) {
        throw new AuthenticationError("invalid/Expired Token");
      }
    }
    if (!token) {
      throw new Error("Authentication token must be Bearer [token] ");
    }
  } else {
    throw new Error("Authentication header must be provided");
  }
};
