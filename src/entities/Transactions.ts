import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Accounts from "./Accounts";

@Entity("transactions")
export default class Transactions {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  value: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @ManyToOne(() => Accounts, (accounts) => accounts.transactions)
  debitAccount: Accounts;
  @ManyToOne(() => Accounts, (accounts) => accounts.transactions)
  creditAccount: Accounts;
}
