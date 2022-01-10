import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { MeQuery, useMeQuery } from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";

const Navbar: FC<ReactNode> = ({ children }) => {
  const { data } = useMeQuery<MeQuery | null | undefined>(graphqlRequestClient);

  return (
    <header>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          listStyle: "none",
        }}
      >
        {data && <p style={{ color: "red" }}>{data?.me?.username}</p>}
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>login</a>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </li>
        <li>
          <button>logout</button>
        </li>
      </ul>
      {children}
    </header>
  );
};

export default Navbar;
