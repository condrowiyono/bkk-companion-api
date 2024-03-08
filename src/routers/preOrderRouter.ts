import express from "express";
import {
  getPreOrderDetail,
  getPreOrders,
  getPreOrderItem,
  getPreOrderHistory,
  approvePreOrder,
} from "../controllers/preOrderController";

const router = express.Router();

router.get("/protected/po", getPreOrders);
router.get("/protected/po/:code", getPreOrderDetail);
router.get("/protected/po/:code/items", getPreOrderItem);
router.get("/protected/po-history", getPreOrderHistory);
router.post("/protected/approve-po/:code", approvePreOrder);

export default router;
