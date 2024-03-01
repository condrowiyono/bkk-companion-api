import express from "express";
import { getProfile } from "../controllers/profileController";

const router = express.Router();

router.get("/protected/profile", getProfile);

export default router;
