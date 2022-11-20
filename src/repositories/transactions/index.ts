import { getRepository, Repository } from "typeorm";
import Transactions from "../../entities/Transactions";

interface TransactionsRepo {
  save: (transactions: Transactions) => Promise<Transactions>;
  findCredit: (id: string, order: string) => Promise<Transactions[]>;
  findDebit: (id: string, order: string) => Promise<Transactions[]>;
}

class TransactionsRepository implements TransactionsRepo {
  private ormRepo: Repository<Transactions>;

  constructor() {
    this.ormRepo = getRepository(Transactions);
  }

  findCredit = async (id: string, order?: string) => {
    return await this.ormRepo.find({
      where: { creditAccount: id },
      relations: ["creditAccount", "debitAccount"],
      order: {
        createdAt: `${order as "ASC" | "DESC"}`,
      },
    });
  };
  findDebit = async (id: string, order: string) => {
    return await this.ormRepo.find({
      where: { debitAccount: id },
      relations: ["debitAccount", "creditAccount"],
      order: {
        createdAt: `${order as "ASC" | "DESC"}`,
      },
    });
  };
  save = async (transactions: Transactions) =>
    await this.ormRepo.save(transactions);
}
export default TransactionsRepository;
