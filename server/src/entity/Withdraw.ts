import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Account from "./Account";

@Entity()
class Withdraw {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  amount: number;

  @ManyToOne(() => Account, (a) => a.withdraws, { onDelete: "CASCADE" })
  account: Account;
}

export default Withdraw;
