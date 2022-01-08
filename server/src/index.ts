import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { MyContext } from "./utils/types";
import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm-config";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({
      em: orm.em,
      req,
      res,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log(`Server start on localhost: ${4000}`);
  });
};

main();
