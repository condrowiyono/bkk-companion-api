import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { generateRefreshToken, generateToken } from "../utils/auth";
import { AuthPayload, RefreshTokenPayload } from "../interfaces/auth";
import { serverLogin } from "../services/auth";

const authenticateUser = async (req: Request<AuthPayload, any, AuthPayload>, res: Response) => {
  const { username, password } = req.body ?? {};

  if (!username || !password) {
    res.status(400).json({ message: "Invalid employe_id or password" });
    return;
  }

  /** This code block intented to demo purposes
   *  username and password will be admin and admin
   */

  if (username === "admin99999" || password === "admin99999") {
    const employe_id = "-999999";
    res.json({
      message: "User authenticated as demo",
      token: generateToken(employe_id),
      employe_id: employe_id,
      refresh_token: "",
    });
    return;
  }

  try {
    // TODO)) Implement user authentication
    const data = await serverLogin(username, password);
    const token = generateToken(data.NIK);
    const refreshToken = generateRefreshToken(data.NIK);

    res.json({
      message: "User authenticated",
      token: token,
      employe_id: data.NIK,
      refresh_token: refreshToken,
    });
  } catch (e) {
    console.error(e);
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
