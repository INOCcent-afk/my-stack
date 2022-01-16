import { Post } from "../entities/Post";
import { MyContext } from "src/utils/types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { FieldError } from "../models/Error";

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(@Ctx() { em, req }: MyContext): Promise<Post[] | null> {
    if (!req.session.userId) {
      return null;
    }
    const posts = await em.find(Post, {});

    return posts;
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return await em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("creator") creator: number,
    @Arg("title") title: string,
    @Arg("description", { nullable: true }) description: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { creator, title, description });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => PostResponse)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", { nullable: true }) title: string,
    @Arg("description", { nullable: true }) description: string,
    @Ctx() { em, req }: MyContext
  ): Promise<PostResponse | null> {
    const post = await em.findOne(Post, { id });

    if (req.session.userId !== post?.creator.id) {
      return {
        errors: [{ field: "user", message: "you can only edit your own post" }],
      };
    }

    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }

    if (typeof description !== "undefined") {
      post.description = description;
      await em.persistAndFlush(post);
    }

    return { post };
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Post, { id });
    return true;
  }
}
