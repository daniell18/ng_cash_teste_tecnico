import Transactions from "../../entities/Transactions";
import {
  AccountRepository,
  UserRepository,
  TransactionsRepository,
} from "../../repositories";

const cashOutAccountService = async (
  usernameCredit: string,
  data: Transactions,
  usernameDebit: string
) => {
  const transaction = await new TransactionsRepository().save(data);
  const userCredit = await new UserRepository().findByUsername(usernameCredit);
  const accountCredit = await new AccountRepository().findById(
    userCredit.account.id
  );
  const userDebit = await new UserRepository().findByUsername(usernameDebit);
  const accountDebit = await new AccountRepository().findById(
    userDebit.account.id
  );
  if (userCredit.account.balance >= data.value) {
    accountCredit.balance -= data.value;
    transaction.creditAccount = accountCredit;
    accountDebit.balance += data.value;
    transaction.debitAccount = accountDebit;
    transaction.createdAt = new Date();
    const newtransaction = await new TransactionsRepository().save(transaction);
    await new AccountRepository().save(accountCredit);
    await new AccountRepository().save(accountDebit);

    return {
      data: {
        id: newtransaction.id,
        value: newtransaction.value,
        createdAt: newtransaction.createdAt,
        creditAccount: newtransaction.creditAccount.id,
        newBalance: accountCredit.balance,
      },
    };
  }

  return { error: "Insuficient Balance" };
};
export default cashOutAccountService;
