import React from "react";
import { PostsQuery, usePostsQuery } from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import Post from "../ui/Post";

const PostsListContainer = () => {
  const { data, isLoading } = usePostsQuery<PostsQuery, Error>(
    graphqlRequestClient,
    {}
  );

  if (isLoading) {
    return (
      <div className="">
        <h1 className="text-7xl my-8 font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-7xl my-8 font-bold text-gray-800">Posts</h1>

      <div className="flex flex-col gap-5">
        {data &&
          data.posts.map((item) => (
            <Post
              key={item.id}
              title={item.title}
              id={item.id}
              description={item.description as string}
              addAction={() => {}}
              substructAction={() => {}}
              voteNumber={0}
            />
          ))}
      </div>
    </div>
  );
};

export default PostsListContainer;
