import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Invalid authorization header" });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, message: "Authorization token not found" });
  }

  try {
    jwt.verify(token, JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default jwtMiddleware;
