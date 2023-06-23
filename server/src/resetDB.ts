import db from "./db";
import Account from "./entity/Account";
import Transfer from "./entity/Transfer";
import User from "./entity/User";
import Withdraw from "./entity/Withdraw";

async function run(): Promise<void> {
  await db.initialize();

  await db.getRepository(Withdraw).delete({});
  await db.getRepository(Transfer).delete({});
  await db.getRepository(Account).delete({});
  await db.getRepository(User).delete({});
  const u1 = await db.getRepository(User).save({ email: "user1@gmail.com" });
  const u2 = await db.getRepository(User).save({ email: "user2@gmail.com" });
  const u3 = await db.getRepository(User).save({ email: "user3@gmail.com" });
  await db.getRepository(Account).save([
    { name: "main", balance: 100, user: u1 },
    { name: "savings", balance: 1000, user: u1 },
    { name: "main", balance: 50, user: u2 },
    { name: "savings", balance: 500, user: u2 },
    { name: "main", balance: 3000, user: u3 },
  ]);

  /*
  const numbers: number[] = new Array(50000)
    .fill(null)
    .map((_, idx) => idx + 1);

  await db
    .getRepository(User)
    .save(numbers.map((n) => ({ email: `user${n}@example.com` })));


  for (let i = 1; i < 100; i += 1) {
    console.log(`batch ${i}`);
    await db
      .getRepository(User)
      .save(numbers.map((n) => ({ email: `user${n}-${i}@example.com` })));
  }
  */

  await db.destroy();
  console.log("done !");
}

run().catch(console.error);
