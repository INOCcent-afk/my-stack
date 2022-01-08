import { MyContext } from "src/utils/types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello(@Ctx() {}: MyContext): String {
    return "hello world";
  }
}
