import express from "express";
import { authenticateUser, refreshToken } from "../controllers/authController";

const router = express.Router();

router.post("/login", authenticateUser);
router.post("/refresh", refreshToken);

export default router;
