import Link from "next/link";
import React, { FC } from "react";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { ILink } from "../../models/ILink";
import { withAuthNavItems, noAuthNavItems } from "./mainNavItems";

const Navbar: FC = () => {
  const { data } = useMeQuery<MeQuery | null | undefined>(graphqlRequestClient);

  return (
    <header className="py-6 flex items-center justify-center bg-gray-800">
      <ul className="flex items-center gap-4 text-white">
        {data && <p style={{ color: "red" }}>{data?.me?.username}</p>}
        {data?.me && (
          <>
            <NavbarList links={withAuthNavItems} />
            <li>
              <button>logout</button>
            </li>
          </>
        )}

        {!data?.me && <NavbarList links={noAuthNavItems} />}
      </ul>
    </header>
  );
};

interface NavbarListProps {
  links: ILink[];
}

const NavbarList: FC<NavbarListProps> = ({ links }) => {
  return (
    <>
      {links.map((link, index) => (
        <Link href={link.href} key={index}>
          <li className="hover:text-gray-400 transition ease-in-out cursor-pointer delay-100">
            {link.linkName}
          </li>
        </Link>
      ))}
    </>
  );
};

export default Navbar;
