import { AccountRepository, UserRepository } from "../../repositories";

const cashInServcie = async (username: string, value: number) => {
  const user = await new UserRepository().findByUsername(username);
  const account = await new AccountRepository().findById(user.id);
  account.balance += value;
  const newBalance = await new AccountRepository().save(account);
  return newBalance;
};
export default cashInServcie;
