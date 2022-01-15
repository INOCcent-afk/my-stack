import { useRouter } from "next/router";
import { FC } from "react";
import { MeQuery, useMeQuery } from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";

type withAuthenticationFn = (Component: FC) => FC;

const withAuth: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const { data } = useMeQuery<MeQuery | null | undefined>(
      graphqlRequestClient
    );
    const router = useRouter();

    if (data?.me === null) router.push("/login");

    return data?.me ? <Component /> : null;
  };

  return Authenticated;
};

export default withAuth;
