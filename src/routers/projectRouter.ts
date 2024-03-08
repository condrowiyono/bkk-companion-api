import express from "express";
import { getProjects, getProjectDetail, getProjectHistory, approveProject } from "../controllers/projectController";

const router = express.Router();

router.get("/protected/projects", getProjects);
router.get("/protected/projects/:code", getProjectDetail);
router.get("/protected/projects-history", getProjectHistory);
router.post("/protected/approve-projects/:code", approveProject);

export default router;
