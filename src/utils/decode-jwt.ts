import { Request } from "express";
import jwt from "jsonwebtoken";

type DecodedType = {
  employe_id: string;
  token: string;
  iat: number;
  exp: number;
};

const decodeJwt = (req: Request) => {
  // Bearer token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return null;
  }

  const jwtSecret = process.env.JWT_SECRET || "secret";
  const decoded = jwt.verify(token, jwtSecret);
  return decoded as DecodedType;
};

export { decodeJwt };
