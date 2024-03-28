import { Request, Response } from "express";
import { decodeJwt } from "../utils/decode-jwt";
import safeFetch from "../utils/safeFetch";
import { ServerProjectsResponse } from "../interfaces/project";
import { ServerPreOrderResponse } from "interfaces/preOrder";

type SearchResult = {
  title: string;
  id: string;
  type: "project" | "preOrder";
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
  const preOrderURL = `approvalmgt/public/index.php/PO/PODaftarBelum/${token}/${employeId}`;

  const { data: projects } = await safeFetch<ServerProjectsResponse>(projectURL);
  const { data: preOrders } = await safeFetch<ServerPreOrderResponse>(preOrderURL);

  const response: SearchResult[] = [];

  projects?.forEach((project) => {
    if (project.nama_prod.toLowerCase().includes(query.toLowerCase())) {
      response.push({
        title: project.nama_prod,
        id: project.kode_prod,
        type: "project",
      });
    }
  });

  preOrders?.forEach((preOrder) => {
    if (preOrder.VendorName.toLowerCase().includes(query.toLowerCase())) {
      response.push({
        title: preOrder.VendorName,
        id: preOrder.PONumber2,
        type: "preOrder",
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
  const preOrderURL = `approvalmgt/public/index.php/PO/PODaftarRiwayat/${token}/${employeId}`;

  const { data: projects } = await safeFetch<ServerProjectsResponse>(projectURL);
  const { data: preOrders } = await safeFetch<ServerPreOrderResponse>(preOrderURL);

  const response: SearchResult[] = [];

  projects?.forEach((project) => {
    if (project.nama_prod.toLowerCase().includes(query.toLowerCase())) {
      response.push({
        title: project.nama_prod,
        id: project.kode_prod,
        type: "project",
      });
    }
  });

  preOrders?.forEach((preOrder) => {
    if (preOrder.VendorName.toLowerCase().includes(query.toLowerCase())) {
      response.push({
        title: preOrder.VendorName,
        id: preOrder.PONumber2,
        type: "preOrder",
      });
    }
  });

  res.json({
    data: response,
    message: "Success",
  });
};

export { search, searchHistory };
