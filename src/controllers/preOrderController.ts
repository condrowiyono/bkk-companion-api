import { Request, Response } from "express";

import { decodeJwt } from "../utils/decode-jwt";
import safeFetch from "../utils/safeFetch";
import {
  ServerPreOrderResponse,
  ServerPreOrderDetailResponse,
  ServerPreOrderItemResponse,
  ServerApprovalResponse,
} from "../interfaces/preOrder";
import { ApprovalStatus } from "../interfaces/approval";

// TODO)) Remove hardcoded employeId
const getPreOrders = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const url = `approvalmgt/public/index.php/PO/PODaftarBelum/${token}/${employeId}`;
  const response = await safeFetch<ServerPreOrderResponse>(url);

  res.json(response);
};

const getPreOrderDetail = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;
  const code = req.params.code;
  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = `approvalmgt/public/index.php/PO/PODetailHeader/${token}/${employeId}/${code}`;
  const itemURL = `approvalmgt/public/index.php/PO/PODetailDetail/${token}/${employeId}/${code}`;

  const response = await safeFetch<ServerPreOrderDetailResponse>(url);
  const itemResponse = await safeFetch<ServerPreOrderItemResponse>(itemURL);

  const formattedData = {
    ...response,
    data: { ...response.data?.[0], items: itemResponse.data },
  };

  res.json(formattedData);
};

const getPreOrderItem = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;
  const code = req.params.code;
  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }
  const url = `approvalmgt/public/index.php/PO/PODetailDetail/${token}/${employeId}/${code}`;
  const response = await safeFetch<ServerPreOrderItemResponse>(url);

  res.json(response);
};

const getPreOrderHistory = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = `approvalmgt/public/index.php/PO/PODaftarRiwayat/${token}/${employeId}`;
  const response = await safeFetch<ServerPreOrderResponse>(url);
  res.json(response);
};

const approvePreOrder = async (req: Request, res: Response) => {
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
  const url = `approvalmgt/public/index.php/PO/PODetailApproved/${token}/${employeId}/${code}/${approvals}`;
  const response = await safeFetch<ServerApprovalResponse>(url, {
    method: "POST",
  });

  res.json({ ...response, data: response.data?.[0] });
};

export { getPreOrders, getPreOrderDetail, getPreOrderItem, approvePreOrder, getPreOrderHistory };
