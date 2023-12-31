import { Arg, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User from "../entity/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(
    @Arg("email", { nullable: true }) email?: string
  ): Promise<User[]> {
    return await datasource.getRepository(User).find({ where: { email } });
  }

  /*
  @FieldResolver()
  async accounts(@Root() user: User): Promise<Account[]> {
    return await datasource.getRepository(Account).find({ where: { user } });
  }
  */
}
