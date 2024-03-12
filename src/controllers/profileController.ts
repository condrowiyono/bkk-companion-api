import { Request, Response } from "express";

import { decodeJwt } from "../utils/decode-jwt";
import safeFetch from "../utils/safeFetch";
import { ServerProfileResponse } from "../interfaces/profile";

const getProfile = async (req: Request, res: Response) => {
  const decoded = decodeJwt(req);
  if (!decoded) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const { employe_id: employeId, token } = decoded;
  const pathname = `approvalmgt/public/index.php/umum/profile/${token}/${employeId}`;
  const response = await safeFetch<ServerProfileResponse>(pathname);

  res.json({ ...response, data: response.data?.[0] });
};

export { getProfile };
