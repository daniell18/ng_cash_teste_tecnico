import { Request, Response } from "express";
import { getBalanceService } from "../../services";
const getBalanceController = async (req: Request, res: Response) => {
  const { username } = req.params;
  const getbalance = await getBalanceService(username);
  return res.status(201).json({
    msg: `Your current account balance is ${getbalance.account.balance}`,
    balance: getbalance.account.balance,
  });
};
export default getBalanceController;
