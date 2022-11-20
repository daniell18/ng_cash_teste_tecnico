import { getRepository, Repository } from "typeorm";
import Accounts from "../../entities/Accounts";
import Account from "../../entities/Accounts";

interface AccountRepo {
  save: (account: Account) => Promise<Account>;
  create: (account: Account) => Promise<Account>;
  findById: (id: string) => Promise<Account>;
}

class AccountRepository implements AccountRepo {
  private ormRepo: Repository<Account>;

  constructor() {
    this.ormRepo = getRepository(Account);
  }
  create = async (account: Account) => await this.ormRepo.create(account);
  save = async (account: Account) => await this.ormRepo.save(account);
  findById = async (id: string) => {
    return await this.ormRepo.findOne({
      where: { id },
    });
  };
}
export default AccountRepository;
