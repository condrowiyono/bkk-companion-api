import { Request, Response } from "express";
import dotenv from "dotenv";

import safeParseResponse from "../utils/safeParseResponse";
import { decodeJwt } from "../utils/decode-jwt";
import { ApprovalStatus } from "../interfaces/approval";

dotenv.config();

const baseURL = process.env.BASE_URL || "https://www.google.com";

const getProjects = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/proyek/proyekDaftarBelum/${token}/${employeId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      res.status(response.status).json({ message: "Error fetching data" });
      return;
    }

    res.json(await safeParseResponse(response));
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

const getProjectDetail = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;
  const code = req.params.code;

  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/proyek/proyekDetail/${token}/${employeId}/${code}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      res.status(response.status).json({ message: "Error fetching data" });
      return;
    }

    res.json(await safeParseResponse(response));
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

const getProjectHistory = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/proyek/proyekDaftarRiwayat/${token}/${employeId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status).json({ message: "Error fetching data" });
      return;
    }
    res.json(await safeParseResponse(response));
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

const approveProject = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;
  const code = req.params.code;
  const approvals = req.body.approvals;

  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  if (![ApprovalStatus.NOT_APPROVED, ApprovalStatus.APPROVED, ApprovalStatus.REJECTED].includes(approvals)) {
    res.status(400).json({ message: "Invalid approvals" });
    return;
  }

  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/proyek/proyekDetailApproved/${token}/${employeId}/${code}/${approvals}`;

  try {
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      res.status(response.status).json({ message: "Error fetching data" });
      return;
    }
    res.json(await safeParseResponse(response));
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

export { getProjects, getProjectDetail, getProjectHistory, approveProject };
