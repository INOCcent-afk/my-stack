import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useQueryClient } from "react-query";
import {
  LogoutMutation,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { ILink } from "../../models/ILink";
import { withAuthNavItems, noAuthNavItems } from "./mainNavItems";

const Navbar: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useMeQuery<MeQuery | null | undefined>(graphqlRequestClient);
  const mutation = useLogoutMutation<LogoutMutation | Error>(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Me");
        router.push("/login");
      },
    }
  );

  return (
    <header className="py-6 flex items-center justify-center bg-gray-800">
      <ul className="flex items-center gap-4 text-white">
        {data && <p style={{ color: "red" }}>{data?.me?.username}</p>}
        {data?.me && (
          <>
            <NavbarList links={withAuthNavItems} />
            <li onClick={() => mutation.mutate({})}>
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
