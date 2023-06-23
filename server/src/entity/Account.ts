import { Field, ObjectType } from "type-graphql";
import {
  Check,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Transfer from "./Transfer";
import Withdraw from "./Withdraw";
import { TypeormLoader } from "type-graphql-dataloader";

@Entity()
@ObjectType()
@Check('"balance" > 0')
class Account {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user) => user.accounts)
  @TypeormLoader()
  user: User;

  @Column()
  @Field()
  name: string;

  @Column({ type: "float" })
  @Field()
  balance: number;

  @OneToMany(() => Transfer, (t) => t.from)
  outgoingTransfers: Transfer[];

  @OneToMany(() => Transfer, (t) => t.to)
  incomingTransfers: Transfer[];

  @OneToMany(() => Withdraw, (w) => w.account)
  withdraws: Withdraw[];
}

export default Account;
