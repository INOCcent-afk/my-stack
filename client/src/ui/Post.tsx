import Link from "next/link";
import React, { FC } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  DeletePostMutation,
  MeQuery,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import Button from "./Button";
import UpVotes from "./UpVotes";

interface PostProps {
  title: string;
  id: number;
  description: string;
  voteNumber: number;
  creator: string;
}

const Post: FC<PostProps> = ({
  title,
  id,
  description,
  voteNumber,
  creator,
}) => {
  const queryClient = useQueryClient();

  const { data } = useMeQuery<MeQuery | null | undefined>(graphqlRequestClient);

  const deletePost = useDeletePostMutation<DeletePostMutation | Error>(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Posts");
        toast.success("Deleted Post");
      },
    }
  );

  return (
    <div className="text-white bg-gray-800 p-5 flex flex-col rounded-md gap-6">
      <div className="flex items-center gap-2 ">
        <h1 className="font-bold text-xl">{creator}:</h1>
        <p>{title}</p>
      </div>
      <div className="flex items-start gap-10">
        <UpVotes
          addAction={() => {}}
          substructAction={() => {}}
          voteNumber={voteNumber}
        />
        <div className="">{description}</div>
      </div>
      {data?.me?.id === id ? (
        <div className="flex gap-4 self-end">
          <Link href={`/post-edit/${id}`}>
            <a>
              <Button text="Edit" variant="success" />
            </a>
          </Link>
          <Button
            text="Delete"
            onClick={() => deletePost.mutate({ id })}
            variant="error"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Post;
