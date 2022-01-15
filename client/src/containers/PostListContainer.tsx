import Link from "next/link";
import React from "react";
import { PostsQuery, usePostsQuery } from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import Button from "../ui/Button";
import UpVotes from "../ui/UpVotes";

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
            <div
              className="text-white bg-gray-800 p-5 flex flex-col rounded-md gap-6"
              key={item.id}
            >
              <div className="">{item.title}</div>
              <div className="flex items-start gap-10">
                <UpVotes
                  addAction={() => {}}
                  substructAction={() => {}}
                  voteNumber={0}
                />
                <div className="">Description</div>
              </div>
              <div className="flex gap-4 self-end">
                <Link href={`/post-edit/${item.id}`}>
                  <Button text="Edit" onClick={() => {}} variant="success" />
                </Link>
                <Button text="Delete" onClick={() => {}} variant="error" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostsListContainer;
