import { Request, Response } from "express";
import cashInServcie from "../../services/accounts/cahsInAccoutn.service";

const cashIncController = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { value } = req.validated;
  const newBalance = await cashInServcie(username, value);
  return res.status(200).json(newBalance);
};
export default cashIncController;
