import { Router } from "express";
import accountRoutes from "./accounts/account.routes";
import transactionsRoutes from "./transactions/transactions.routes";
import userRoutes from "./user/user.routes";

const router = Router();

router.use(userRoutes);
router.use(accountRoutes);
router.use(transactionsRoutes);

export default router;
