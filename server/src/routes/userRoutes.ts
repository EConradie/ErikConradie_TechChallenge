import { Router } from "express";
import * as UserController from "../controllers/userController";
import auth from "../middleware/auth";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.delete("/delete", auth, UserController.deleteAccount);

export default router;
