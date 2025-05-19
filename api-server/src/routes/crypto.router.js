import express from "express"
const router = express.Router();

import { stats,deviation } from "../controllers/crypto.controller.js";


router.get("/stats",stats);
router.get("/deviation",deviation);

export default router