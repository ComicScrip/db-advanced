import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";
import { Field, Float, InputType, ObjectType } from "type-graphql";
import { Min } from "class-validator";

@Entity()
@ObjectType()
class Transfer {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "float" })
  amount: number;

  @Field(() => Account)
  @ManyToOne(() => Account, (a) => a.outgoingTransfers, { onDelete: "CASCADE" })
  from: Account;

  @Field(() => Account)
  @ManyToOne(() => Account, (a) => a.incomingTransfers, { onDelete: "CASCADE" })
  to: Account;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

@InputType()
export class TransferInput {
  @Field()
  fromAccountId: number;

  @Field()
  toAccountId: number;

  @Min(0)
  @Field(() => Float)
  amount: number;
}

export default Transfer;
