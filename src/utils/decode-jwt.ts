import { Request } from "express";
import jwt from "jsonwebtoken";

type DecodedType = {
  employe_id: string;
  token: string;
  iat: number;
  exp: number;
};

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const decodeJwt = (req: Request) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authorizationHeader.replace("Bearer ", "");
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as DecodedType;
  } catch (err) {
    return null;
  }
};

export { decodeJwt };
