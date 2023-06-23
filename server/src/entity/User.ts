import { Field, ObjectType } from "type-graphql";
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";
import { TypeormLoader } from "type-graphql-dataloader";
import { argon2id, hash, verify } from "argon2";

// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => verify(hashedPassword, plainPassword, hashingOptions);

@Entity()
@ObjectType()
class User {
  @Column({ nullable: true })
  password?: string;

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

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    if (typeof this.password === "string")
      this.password = await hash(this.password, hashingOptions);
  }
}

export default User;
