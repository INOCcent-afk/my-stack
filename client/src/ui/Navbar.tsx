import Link from "next/link";
import React, { FC, ReactNode } from "react";

const Navbar: FC<ReactNode> = ({ children }) => {
  return (
    <header>
      <ul>
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
