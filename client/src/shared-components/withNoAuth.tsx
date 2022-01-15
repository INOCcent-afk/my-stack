import { useRouter } from "next/router";
import { FC } from "react";
import { MeQuery, useMeQuery } from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { isServer } from "../utils/isServer";

type withNoAuthenticationFn = (Component: FC) => FC;

const withNoAuth: withNoAuthenticationFn = (Component) => {
  const NotAuthenticated: FC = (): JSX.Element | null => {
    const { data } = useMeQuery<MeQuery | null | undefined>(
      graphqlRequestClient
    );
    const router = useRouter();

    if (!isServer() && data?.me !== null) {
      router.push("/");
    }

    return data?.me === null ? <Component /> : null;
  };

  return NotAuthenticated;
};

export default withNoAuth;
