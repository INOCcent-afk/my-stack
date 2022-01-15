import React, { FC } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronUpIcon from "../icons/ChevronUpIcon";

export interface UpVotesProps {
  addAction: () => void;
  voteNumber: number;
  substructAction: () => void;
}

const UpVotes: FC<UpVotesProps> = ({
  addAction,
  voteNumber,
  substructAction,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="cursor-pointer" onClick={addAction}>
        <ChevronUpIcon />
      </div>
      <div className="">{voteNumber}</div>
      <div className="cursor-pointer" onClick={substructAction}>
        <ChevronDownIcon />
      </div>
    </div>
  );
};

export default UpVotes;
