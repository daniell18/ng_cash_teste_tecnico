import { TransactionsRepository, UserRepository } from "../../repositories";

const getDebitService = async (username: string, order: string = "ASC") => {
  const user = await new UserRepository().findByUsername(username);
  const transactions = await new TransactionsRepository().findDebit(
    user.account.id,
    order
  );
  transactions.map((item) => {
    delete item.creditAccount.balance;
  });
  return transactions;
};
export default getDebitService;
