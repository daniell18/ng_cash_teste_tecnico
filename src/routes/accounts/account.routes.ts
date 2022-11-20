import {
  cashIncController,
  getBalanceController,
  cashOutAccountController,
} from "../../controller";
import verifyAuth from "../../middlewares/verifyAuth.middleware";
import { Router } from "express";
import validateShape from "../../middlewares/validateShape.middlewares";
import { cashInShape, cashOutShape } from "../../shapes";

const accountRoutes = Router();

accountRoutes.get(
  "/account/:username/balance",
  verifyAuth,
  getBalanceController
);

accountRoutes.post(
  "/account/:username/cashout",
  validateShape(cashOutShape),
  verifyAuth,
  cashOutAccountController
);
accountRoutes.post(
  "/account/:username/cashin",
  validateShape(cashInShape),
  verifyAuth,
  cashIncController
);

export default accountRoutes;
