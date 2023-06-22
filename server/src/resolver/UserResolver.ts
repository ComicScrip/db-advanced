import { Arg, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User from "../entity/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(@Arg("email") email: string): Promise<User[]> {
    return await datasource.getRepository(User).find({ where: { email } });
  }
}
