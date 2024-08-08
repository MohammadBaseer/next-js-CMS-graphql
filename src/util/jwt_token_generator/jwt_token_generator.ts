import Jwt from "jsonwebtoken";

function generateToken(user: { id: string; email: string; username: string }) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return Jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    secret,
    {
      expiresIn: "2h",
    }
  );
}

export default generateToken;
