import { Request, Response } from "express";
import {
  getCreditService,
  getDebitService,
  getTransactionService,
} from "../../services";

const getTransactionsController = async (req: Request, res: Response) => {
  const { type, order } = req.query;
  const { username } = req.params;
  if (!type) {
    const transactions = await getTransactionService(username, order as string);
    if (
      !transactions.creditTransaction.length &&
      !transactions.debitTransaction.length
    ) {
      return res.status(200).json({
        msg: "This account has not performed transactions yet",
      });
    }
    return res.status(200).json(transactions);
  }
  if (type === "credit") {
    const transactions = await getCreditService(username, order as string);
    if (!transactions.length) {
      return res.status(200).json({
        msg: "This account has not yet performed transactions of this type",
      });
    }
    return res.status(200).json(transactions);
  } else if (type === "debit") {
    const transactions = await getDebitService(username, order as string);
    if (!transactions.length) {
      return res.status(200).json({
        msg: "This account has not yet performed transactions of this type",
      });
    }
    return res.status(200).json(transactions);
  } else {
    return res
      .status(400)
      .json({ error: "the type variable only accepts credit or debit" });
  }
};
export default getTransactionsController;
