import dotenv from "dotenv";
import { Request, Response } from "express";

import safeParseResponse from "../utils/safeParseResponse";
import { decodeJwt } from "../utils/decode-jwt";
import { ServerProfileResponse } from "../interfaces/profile";

dotenv.config();
const baseURL = process.env.BASE_URL || "https://www.google.com";

const getProfile = async (req: Request, res: Response) => {
  const decoded = decodeJwt(req);
  if (!decoded) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const { employe_id: employeId, token } = decoded;
  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/umum/profile/${token}/${employeId}`;

  try {
    const response = await fetch(url);
    const data = await safeParseResponse<ServerProfileResponse>(response);
    res.json({ message: "Success", data: data[0] });
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

export { getProfile };
