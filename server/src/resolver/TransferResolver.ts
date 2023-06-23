import { Arg, Mutation, Resolver } from "type-graphql";
import datasource from "../db";
import Transfer, { TransferInput } from "../entity/Transfer";
import Account from "../entity/Account";

@Resolver(Transfer)
export class TransferResolver {
  @Mutation(() => String)
  async createTransfer(@Arg("data") data: TransferInput): Promise<string> {
    const { amount, fromAccountId, toAccountId } = data;

    const from = await datasource
      .getRepository(Account)
      .findOneByOrFail({ id: fromAccountId });
    const to = await datasource
      .getRepository(Account)
      .findOneByOrFail({ id: toAccountId });

    await datasource.manager.transaction(async (transactionalEntityManager) => {
      from.balance = from.balance - amount;
      to.balance = to.balance + amount;

      const transfer = new Transfer();
      transfer.amount = data.amount;
      transfer.to = to;
      transfer.from = from;

      await transactionalEntityManager.save(to);
      await transactionalEntityManager.save(from);
      await transactionalEntityManager.save(transfer);
    });

    return "ok";
  }
}
