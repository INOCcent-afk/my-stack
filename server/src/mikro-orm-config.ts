import { Options } from "@mikro-orm/core";
import { __prod__ } from "./utils/constants";
import path from "path";
import { Post } from "./entities/Post";

const config: Options = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post],
  dbName: "mystack",
  user: "postgres",
  password: "passwordinoc",
  type: "postgresql",
  debug: !__prod__,
};

export default config;
