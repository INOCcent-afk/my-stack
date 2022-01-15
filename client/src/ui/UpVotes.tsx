import React, { FC, HTMLProps } from "react";

interface UpVotesProps {
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
      <div className="" onClick={addAction}>
        Add
      </div>
      <div className="">{voteNumber}</div>
      <div className="" onClick={substructAction}>
        Minus
      </div>
    </div>
  );
};

export default UpVotes;
