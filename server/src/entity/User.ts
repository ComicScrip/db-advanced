import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";
import { TypeormLoader } from "type-graphql-dataloader";

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Index()
  email: string;

  @Field(() => [Account])
  @OneToMany(() => Account, (a) => a.user)
  @TypeormLoader()
  accounts: Account[];
}

export default User;
