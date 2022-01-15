import Link from "next/link";
import React, { FC } from "react";
import Button from "./Button";
import UpVotes, { UpVotesProps } from "./UpVotes";

interface PostProps extends UpVotesProps {
  title: string;
  id: number;
  description: string;
}

const Post: FC<PostProps> = ({
  title,
  id,
  description,
  addAction,
  substructAction,
  voteNumber,
}) => {
  return (
    <div className="text-white bg-gray-800 p-5 flex flex-col rounded-md gap-6">
      <div className="flex items-center gap-2 ">
        <h1 className="font-bold text-xl">Creator:</h1>
        <p>{title}</p>
      </div>
      <div className="flex items-start gap-10">
        <UpVotes
          addAction={addAction}
          substructAction={substructAction}
          voteNumber={voteNumber}
        />
        <div className="">{description}</div>
      </div>
      <div className="flex gap-4 self-end">
        <Link href={`/post-edit/${id}`}>
          <Button text="Edit" onClick={() => {}} variant="success" />
        </Link>
        <Button text="Delete" onClick={() => {}} variant="error" />
      </div>
    </div>
  );
};

export default Post;
