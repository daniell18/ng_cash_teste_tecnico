import { Request, Response } from "express";
import Accounts from "../../entities/Accounts";
import User from "../../entities/User";
import { createAccountService, createUserService } from "../../services";
import { handleError } from "../../utils";

const createUserController = async (req: Request, res: Response) => {
  try {
    const data = { balance: 100 };
    const user = await createUserService(req.validated as User);
    const updateuser = await createAccountService(
      user as User,
      data as Accounts
    );

    return res.status(201).json({
      msg: "account successfully created ",
      username: updateuser.username,
    });
  } catch (error: any) {
    return handleError(error, res);
  }
};

export default createUserController;
