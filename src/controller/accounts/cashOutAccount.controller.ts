import { Request, Response } from "express";
import Transactions from "../../entities/Transactions";
import { cashOutAccountService } from "../../services";

const cashOutAccountController = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { value } = req.validated;
  const data = {
    value: value,
  };
  const newbalance = await cashOutAccountService(
    username,
    data as Transactions,
    req.validated.username
  );
  return res.status(200).json(newbalance);
};

export default cashOutAccountController;
