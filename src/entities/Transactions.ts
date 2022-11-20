import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Accounts from "./Accounts";

@Entity("transactions")
export default class Transactions {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  value: number;

  @Column({ nullable: true })
  createdAt: Date;

  @ManyToOne(() => Accounts, (accounts) => accounts.transactions, {
    nullable: true,
  })
  debitAccount: Accounts;
  @ManyToOne(() => Accounts, (accounts) => accounts.transactions, {
    nullable: true,
  })
  creditAccount: Accounts;
}
