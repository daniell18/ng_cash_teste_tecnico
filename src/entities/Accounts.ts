import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Transactions from "./Transactions";

@Entity("accounts")
export default class Accounts {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  balance: number;

  @OneToMany(
    () => Transactions,
    (transactions) => {
      transactions.debitAccount;
      transactions.creditAccount;
    },
    { nullable: true }
  )
  transactions: Transactions[];
}
