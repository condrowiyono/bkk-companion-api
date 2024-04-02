import { Request, Response } from "express";

import { decodeJwt } from "../utils/decode-jwt";
import safeFetch from "../utils/safeFetch";
import {
  ServerPurchaseOrderResponse,
  ServerPurchaseOrderDetailResponse,
  ServerPurchaseOrderItemResponse,
  ServerApprovalResponse,
} from "../interfaces/purchaseOrder";
import { ApprovalStatus } from "../interfaces/approval";

// TODO)) Remove hardcoded employeId
const getPurchaseOrders = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const url = `approvalmgt/public/index.php/PO/PODaftarBelum/${token}/${employeId}`;
  const response = await safeFetch<ServerPurchaseOrderResponse>(url);

  res.json(response);
};

const getPurchaseOrderDetail = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;
  const code = req.params.code;
  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = `approvalmgt/public/index.php/PO/PODetailHeader/${token}/${employeId}/${code}`;
  const itemURL = `approvalmgt/public/index.php/PO/PODetailDetail/${token}/${employeId}/${code}`;
  const checkStatusURL = `approvalmgt/public/index.php/PO/PODaftarCekStatus/${token}/${employeId}/${code}`;

  const [response, itemResponse, checkStatusResponse] = await Promise.all([
    safeFetch<ServerPurchaseOrderDetailResponse>(url),
    safeFetch<ServerPurchaseOrderItemResponse>(itemURL),
    safeFetch<ServerPurchaseOrderDetailResponse>(checkStatusURL),
  ]);

  const formattedData = {
    status: 200,
    message: "Success",
    data: {
      ...response.data?.[0],
      status: checkStatusResponse.data?.[0]?.statusAksi,
      items: itemResponse.data,
    },
  };

  res.json(formattedData);
};

const getPurchaseOrderItem = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;
  const code = req.params.code;
  if (!token || !employeId || !code) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }
  const url = `approvalmgt/public/index.php/PO/PODetailDetail/${token}/${employeId}/${code}`;
  const response = await safeFetch<ServerPurchaseOrderItemResponse>(url);

  res.json(response);
};

const getPurchaseOrderHistory = async (req: Request, res: Response) => {
  const employeId = decodeJwt(req)?.employe_id;
  const token = decodeJwt(req)?.token;

  if (!token || !employeId) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = `approvalmgt/public/index.php/PO/PODaftarRiwayat/${token}/${employeId}`;
  const response = await safeFetch<ServerPurchaseOrderResponse>(url);
  res.json(response);
};

const approvePurchaseOrder = async (req: Request, res: Response) => {
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

export {
  getPurchaseOrders,
  getPurchaseOrderDetail,
  getPurchaseOrderItem,
  approvePurchaseOrder,
  getPurchaseOrderHistory,
};
