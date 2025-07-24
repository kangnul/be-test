import { Router } from "express";
import * as UserController from "../controllers/UserController";

const router = Router();

router.post("/auth/register", UserController.register); // URL kalau mau register
router.post("/auth/login", UserController.login); // URL kalau mau login

export default router;