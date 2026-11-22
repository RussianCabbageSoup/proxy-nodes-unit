import { Router } from "express";
import Controller from "../controllers/Controller.js";

const router = Router();

router.get('/health', Controller.health);

router.post('/proxy', Controller.proxy);

export default router;