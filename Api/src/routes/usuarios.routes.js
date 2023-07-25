import { Router } from "express";
import { getAll, getShow } from "../controllers/usuarios.js";

const router = Router();

router.get('/usuarios/all', getAll)
router.get('/usuarios/show/:id', getShow)

export default router;