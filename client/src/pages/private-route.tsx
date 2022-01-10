import React from "react";
import withAuth from "../shared-components/withAuth";

const privateRoute = () => {
  return (
    <div
      style={{
        width: 500,
        height: 500,
        backgroundColor: "black",
        margin: "auto",
      }}
    ></div>
  );
};

export default withAuth(privateRoute);
