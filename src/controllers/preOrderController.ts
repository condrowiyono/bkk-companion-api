import dotenv from "dotenv";
import { Request, Response } from "express";

import safeParseResponse from "../utils/safeParseResponse";
import { decodeJwt } from "../utils/decode-jwt";
import {
  ServerPreOrderResponse,
  ServerPreOrderDetailResponse,
  ServerPreOrderItemResponse,
  ServerApprovalResponse,
} from "../interfaces/preOrder";
import { ApprovalStatus } from "../interfaces/approval";

dotenv.config();
const baseURL = process.env.BASE_URL || "https://www.google.com";

// TODO)) Remove hardcoded employeId
const getPreOrders = async (req: Request, res: Response) => {
  // const employeId = decodeJwt(req)?.employe_id;
  const employeId = "6207";
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const url = new URL(baseURL);

  url.pathname = `approvalmgt/public/index.php/PO/PODaftarBelum/${token}/${employeId}`;

  try {
    const response = await fetch(url);
    const data = await safeParseResponse<ServerPreOrderResponse>(response);
    res.json({ message: "Success", data });
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

const getPreOrderDetail = async (req: Request, res: Response) => {
  // const employeId = decodeJwt(req)?.employe_id;
  const employeId = "6207";
  const token = decodeJwt(req)?.token;
  const code = req.params.code;
  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }
  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/PO/PODetailHeader/${token}/${employeId}/${code}`;

  const itemURL = new URL(baseURL);
  itemURL.pathname = `approvalmgt/public/index.php/PO/PODetailDetail/${token}/${employeId}/${code}`;

  try {
    const response = await fetch(url);
    const data = await safeParseResponse<ServerPreOrderDetailResponse>(response);
    // Only return the first data, trim the returned array
    const itemResponse = await fetch(itemURL);
    const itemData = await safeParseResponse<ServerPreOrderItemResponse>(itemResponse);

    const formattedData = {
      ...data[0],
      items: itemData,
    };

    res.json({ message: "Success", data: formattedData });
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

const getPreOrderItem = async (req: Request, res: Response) => {
  // const employeId = decodeJwt(req)?.employe_id;
  const employeId = "6207";
  const token = decodeJwt(req)?.token;
  const code = req.params.code;
  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }
  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/PO/PODetailDetail/${token}/${employeId}/${code}`;
  try {
    const response = await fetch(url);
    const data = await safeParseResponse<ServerPreOrderItemResponse>(response);
    // Only return the first data, trim the returned array
    res.json({ message: "Success", data });
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

const getPreOrderHistory = async (req: Request, res: Response) => {
  // const employeId = decodeJwt(req)?.employe_id;
  const employeId = "6207";
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/PO/PODaftarRiwayat/${token}/${employeId}`;

  try {
    const response = await fetch(url);
    const data = await safeParseResponse<ServerPreOrderResponse>(response);

    res.json({ message: "Success", data });
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

const approvePreOrder = async (req: Request, res: Response) => {
  // const employeId = decodeJwt(req)?.employe_id;
  const employeId = "6207";
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
  url.pathname = `approvalmgt/public/index.php/PO/PODetailApproved/${token}/${employeId}/${code}/${approvals}`;
  try {
    const response = await fetch(url, { method: "POST" });
    const data = await safeParseResponse<ServerApprovalResponse>(response);
    res.json({ message: "Success", data: data[0] });
  } catch (e) {
    res.json({ message: "Error fetching data" });
  }
};

export { getPreOrders, getPreOrderDetail, getPreOrderItem, approvePreOrder, getPreOrderHistory };
