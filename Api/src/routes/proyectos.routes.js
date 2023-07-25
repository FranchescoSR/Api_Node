import { Router } from "express";
import { getAll, getShow } from "../controllers/proyectos.js";

const router = Router();

router.get('/proyectos/all', getAll)
router.get('/proyectos/show/:id', getShow)

export default router;