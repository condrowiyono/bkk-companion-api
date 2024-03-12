import { Request, Response } from "express";

import { decodeJwt } from "../utils/decode-jwt";
import safeFetch from "../utils/safeFetch";
import {
  ServerApprovalResponse,
  ServerProjectsResponse,
  ServerProjectDetailResponse,
  ServerProjectHistoryResponse,
} from "../interfaces/project";
import { ApprovalStatus } from "../interfaces/approval";

const getProjects = async (req: Request, res: Response) => {
  const decoded = decodeJwt(req);
  if (!decoded) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const { employe_id: employeId, token } = decoded;
  const url = `approvalmgt/public/index.php/proyek/proyekDaftarBelum/${token}/${employeId}`;
  const response = await safeFetch<ServerProjectsResponse>(url);

  res.json(response);
};

const getProjectDetail = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;
  const code = req.params.code;

  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = `approvalmgt/public/index.php/proyek/proyekDetail/${token}/${employeId}/${code}`;
  const response = await safeFetch<ServerProjectDetailResponse>(url);

  res.json({ ...response, data: response.data?.[0] });
};

const getProjectHistory = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = `approvalmgt/public/index.php/proyek/proyekDaftarRiwayat/${token}/${employeId}`;
  const response = await safeFetch<ServerProjectHistoryResponse>(url);

  res.json(response);
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

  const url = `approvalmgt/public/index.php/proyek/proyekDetailApproved/${token}/${employeId}/${code}/${approvals}`;
  const response = await safeFetch<ServerApprovalResponse>(url, { method: "POST" });

  res.json({ ...response, data: response.data?.[0] });
};

export { getProjects, getProjectDetail, getProjectHistory, approveProject };
