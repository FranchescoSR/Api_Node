import { Router } from "express";
import { login, logout } from "../controllers/authentication.js";

const router = Router();

router.get('/auth/login', login)
router.get('/auth/logout', logout)

export default router;