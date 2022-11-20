import { getRepository, Repository } from "typeorm";
import User from "../../entities/User";

interface UserRepo {
  save: (user: User) => Promise<User>;
  findByUsername: (id: string) => Promise<User>;
}

class UserRepository implements UserRepo {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = getRepository(User);
  }

  save = async (user: User) => await this.ormRepo.save(user);
  findByUsername = async (username: string) => {
    return await this.ormRepo.findOne({
      where: { username },
      relations: ["account"],
    });
  };
}
export default UserRepository;
