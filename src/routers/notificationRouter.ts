import express from "express";
import { sendNotification, registerDevice, getNotifications } from "../controllers/notificationController";

const router = express.Router();

router.post("/register-device", registerDevice);
router.post("/send-notification", sendNotification);
router.get("/protected/notifications", getNotifications);

export default router;
