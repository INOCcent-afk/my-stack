import { Options } from "@mikro-orm/core";
import { __prod__ } from "./utils/constants";
import path from "path";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

const config: Options = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "mystack",
  user: "postgres",
  password: "passwordinoc",
  type: "postgresql",
  debug: !__prod__,
};

export default config;
