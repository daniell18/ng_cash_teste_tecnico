import { TransactionsRepository, UserRepository } from "../../repositories";

const getTransactionService = async (
  username: string,
  order: string = "ASC"
) => {
  const user = await new UserRepository().findByUsername(username);
  const transactions = {
    creditTransaction: await new TransactionsRepository().findCredit(
      user.account.id,
      order
    ),
    debitTransaction: await new TransactionsRepository().findDebit(
      user.account.id,
      order
    ),
  };
  transactions.creditTransaction.map(
    (trades) => delete trades.debitAccount.balance
  );
  transactions.debitTransaction.map(
    (trades) => delete trades.creditAccount.balance
  );
  return transactions;
};
export default getTransactionService;
