import verifyAuth from "../../middlewares/verifyAuth.middleware";
import { Router } from "express";
import getTransactionsController from "../../controller/transactions/getTransactions.controller";

const transactionsRoutes = Router();
transactionsRoutes.get(
  "/transactions/:username",
  verifyAuth,
  getTransactionsController
);
export default transactionsRoutes;
