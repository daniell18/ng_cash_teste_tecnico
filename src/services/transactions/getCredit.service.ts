import { TransactionsRepository, UserRepository } from "../../repositories";

const getCreditService = async (username: string, order: string = "ASC") => {
  const user = await new UserRepository().findByUsername(username);
  const transactions = await new TransactionsRepository().findCredit(
    user.account.id,
    order
  );
  transactions.map((item) => {
    delete item.debitAccount.balance;
  });
  return transactions;
};
export default getCreditService;
