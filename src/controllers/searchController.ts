import { Request, Response } from "express";
import { decodeJwt } from "../utils/decode-jwt";
import safeFetch from "../utils/safeFetch";
import { ServerProjectsResponse } from "../interfaces/project";
import { ServerPurchaseOrderResponse } from "interfaces/purchaseOrder";

type SearchResult = {
  title: string;
  id: string;
  type: "project" | "purchaseOrder";
};

const search = async (req: Request, res: Response) => {
  const { query } = req.query as { query: string };
  const decoded = decodeJwt(req);

  if (!decoded) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  if (!query) {
    res.status(200).json({ data: [], message: "Query is required" });
    return;
  }

  const { employe_id: employeId, token } = decoded;
  const projectURL = `approvalmgt/public/index.php/proyek/proyekDaftarBelum/${token}/${employeId}`;
  const purchaseOrderURL = `approvalmgt/public/index.php/PO/PODaftarBelum/${token}/${employeId}`;

  const { data: projects } = await safeFetch<ServerProjectsResponse>(projectURL);
  const { data: purchaseOrders } = await safeFetch<ServerPurchaseOrderResponse>(purchaseOrderURL);

  const response: SearchResult[] = [];
  const searchLower = query.toLowerCase();

  projects?.forEach((project) => {
    const idLower = project.kode_prod.toLowerCase();
    const nameLower = project.nama_prod.toLowerCase();

    if (idLower.includes(searchLower) || nameLower.includes(searchLower)) {
      response.push({
        title: project.nama_prod,
        id: project.kode_prod,
        type: "project",
      });
    }
  });

  purchaseOrders?.forEach((po) => {
    const idLower = po.PONumber2.toLowerCase();
    const vendorLower = po.VendorName.toLowerCase();

    if (idLower.includes(searchLower) || vendorLower.includes(searchLower)) {
      response.push({
        title: po.VendorName,
        id: po.PONumber2,
        type: "purchaseOrder",
      });
    }
  });

  res.json({
    data: response,
    message: "Success",
  });
};

const searchHistory = async (req: Request, res: Response) => {
  const { query } = req.query as { query: string };
  const decoded = decodeJwt(req);

  if (!decoded) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  if (!query) {
    res.status(200).json({ data: [], message: "Query is required" });
    return;
  }

  const { employe_id: employeId, token } = decoded;
  const projectURL = `approvalmgt/public/index.php/proyek/proyekDaftarRiwayat/${token}/${employeId}`;
  const purchaseOrderURL = `approvalmgt/public/index.php/PO/PODaftarRiwayat/${token}/${employeId}`;

  const { data: projects } = await safeFetch<ServerProjectsResponse>(projectURL);
  const { data: purchaseOrders } = await safeFetch<ServerPurchaseOrderResponse>(purchaseOrderURL);

  const response: SearchResult[] = [];
  const searchLower = query.toLowerCase();

  projects?.forEach((project) => {
    const idLower = project.kode_prod.toLowerCase();
    const nameLower = project.nama_prod.toLowerCase();

    if (idLower.includes(searchLower) || nameLower.includes(searchLower)) {
      response.push({
        title: project.nama_prod,
        id: project.kode_prod,
        type: "project",
      });
    }
  });

  purchaseOrders?.forEach((po) => {
    const idLower = po.PONumber2.toLowerCase();
    const vendorLower = po.VendorName.toLowerCase();

    if (idLower.includes(searchLower) || vendorLower.includes(searchLower)) {
      response.push({
        title: po.VendorName,
        id: po.PONumber2,
        type: "purchaseOrder",
      });
    }
  });

  res.json({
    data: response,
    message: "Success",
  });
};

export { search, searchHistory };
