import "reflect-metadata";
import db from "./db";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { UserResolver } from "./resolver/UserResolver";
import { TransferResolver } from "./resolver/TransferResolver";

async function start(): Promise<void> {
  await db.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver, TransferResolver],
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerLoaderPlugin({
        typeormGetConnection: () => db.manager.connection, // for use with TypeORM
      }),
    ],
  });

  await server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url as string}`);
  });
}

start().catch(console.error);
