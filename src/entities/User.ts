import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Accounts from "./Accounts";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Accounts, { nullable: true })
  @JoinColumn()
  account: Accounts;
}
