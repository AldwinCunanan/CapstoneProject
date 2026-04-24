import express from "express";
import { signInHandler } from "../controllers/authenticateController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.post("/signin", signInHandler);

export default router;