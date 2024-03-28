import express from "express";

import { search, searchHistory } from "../controllers/searchController";

const router = express.Router();

router.get("/protected/search", search);
router.get("/protected/search-history", searchHistory);

export default router;
