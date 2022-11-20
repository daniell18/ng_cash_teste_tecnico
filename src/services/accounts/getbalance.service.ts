import User from "../../entities/User";
import { AccountRepository, UserRepository } from "../../repositories";

const getBalanceService = async (username: string) => {
  const user = await new UserRepository().findByUsername(username);

  return user;
};
export default getBalanceService;
