import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { generateRefreshToken, generateToken } from "../utils/auth";
import { AuthPayload, RefreshTokenPayload } from "../interfaces/auth";

const authenticateUser = async (req: Request<AuthPayload, any, AuthPayload>, res: Response) => {
  const { employe_id, password } = req.body ?? {};

  if (!employe_id || !password) {
    res.status(400).json({ message: "Invalid employe_id or password" });
    return;
  }

  try {
    // TODO)) Implement user authentication
    // const data = await serverLogin(employe_id, password);
    const token = generateToken(employe_id);
    const refreshToken = generateRefreshToken(employe_id);

    res.json({
      message: "User authenticated",
      token: token,
      refresh_token: refreshToken,
    });
  } catch (e) {
    res.status(401).json({ message: "Invalid employe_id or password" });
  }
};

const refreshToken = (req: Request<RefreshTokenPayload, any, RefreshTokenPayload>, res: Response) => {
  const { refresh_token } = req.body ?? {};

  if (!refresh_token) {
    res.status(400).json({ message: "Invalid refresh token" });
    return;
  }

  const jwtSecret = process.env.JWT_REFRESH_SECRET || "refresh";
  const decoded = jwt.verify(refresh_token, jwtSecret);

  if (!decoded) {
    res.status(401).json({ message: "Invalid refresh token" });
    return;
  }
  const { employe_id } = decoded as { employe_id: string };

  const token = generateToken(employe_id);

  res.json({
    message: "Refreshed",
    token: token,
  });
};

export { authenticateUser, refreshToken };
