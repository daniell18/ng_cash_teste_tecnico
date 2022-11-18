import { Router } from "express";
import userRoutes from "./user/user.routes";

const router = Router();

router.use(userRoutes);

export default router;
