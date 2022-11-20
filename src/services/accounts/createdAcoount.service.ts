import { QueryFailedError } from "typeorm";
import Accounts from "../../entities/Accounts";
import User from "../../entities/User";
import { AccountRepository, UserRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";
interface IDetail extends QueryFailedError {
  detail: string;
}
const createAccountService = async (user: User, data: Accounts) => {
  try {
    const account = await new AccountRepository().save(data);
    user.account = account;
    const updateuser = new UserRepository().save(user);
    return updateuser;
  } catch (error) {
    if (error instanceof QueryFailedError) {
      const detail = (error as IDetail).detail;
      throw new ErrorHandler(409, detail);
    }
  }
};

export default createAccountService;
