import express from "express";
import {
  getPurchaseOrders,
  getPurchaseOrderDetail,
  getPurchaseOrderItem,
  approvePurchaseOrder,
  getPurchaseOrderHistory,
} from "../controllers/purchaseOrderController";

const router = express.Router();

router.get("/protected/po", getPurchaseOrders);
router.get("/protected/po/:code", getPurchaseOrderDetail);
router.get("/protected/po/:code/items", getPurchaseOrderItem);
router.get("/protected/po-history", getPurchaseOrderHistory);
router.post("/protected/approve-po/:code", approvePurchaseOrder);

export default router;
