import { useRouter } from "next/router";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { LoginMutation, useLoginMutation } from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import withNoAuth from "../shared-components/withNoAuth";

const login = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    field: "",
    message: "",
  });

  const handleLogInData = (e: SyntheticEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const loginMutation = useLoginMutation<LoginMutation | Error>(
    graphqlRequestClient,
    {
      onSuccess: (data: LoginMutation) => {
        if (data.login.user) {
          queryClient.invalidateQueries("Me");
          router.push("/");
        } else {
          setErrors({
            field: data.login.errors![0].field,
            message: data.login.errors![0].message,
          });
        }
      },
    }
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ options: userData });
  };

  return (
    <form onSubmit={onSubmit}>
      {errors.field && errors.message && (
        <h1 style={{ color: "red" }}>
          {errors.field}: {errors.message}
        </h1>
      )}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        value={userData.username}
        name="username"
        onChange={(e) => handleLogInData(e)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={userData.password}
        name="password"
        onChange={(e) => handleLogInData(e)}
      />
      <br />
      <button type="submit">login</button>
    </form>
  );
};

export default withNoAuth(login);
