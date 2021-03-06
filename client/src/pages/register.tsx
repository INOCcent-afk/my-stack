import { useRouter } from "next/router";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { RegisterMutation, useRegisterMutation } from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import withNoAuth from "../shared-components/withNoAuth";

const register = () => {
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

  const handleRegisterData = (e: SyntheticEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const loginMutation = useRegisterMutation<RegisterMutation | Error>(
    graphqlRequestClient,
    {
      onSuccess: (data: RegisterMutation) => {
        if (data.register.user) {
          queryClient.invalidateQueries("Me");
          router.push("/");
        } else {
          setErrors({
            field: data.register.errors![0].field,
            message: data.register.errors![0].message,
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
        onChange={(e) => handleRegisterData(e)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={userData.password}
        name="password"
        onChange={(e) => handleRegisterData(e)}
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default withNoAuth(register);
