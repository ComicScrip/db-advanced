import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Account from "./Account";

@Entity()
class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  amount: number;

  @ManyToOne(() => Account, (a) => a.outgoingTransfers, { onDelete: "CASCADE" })
  from: Account;

  @ManyToOne(() => Account, (a) => a.incomingTransfers, { onDelete: "CASCADE" })
  to: Account;
}

export default Transfer;
