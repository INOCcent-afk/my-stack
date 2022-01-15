import React from "react";
import { Form, Formik } from "formik";
import { useQueryClient } from "react-query";
import {
  CreatePostMutation,
  useCreatePostMutation,
} from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { toast } from "react-toastify";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import Button from "../ui/Button";

const createPost = () => {
  const queryClient = useQueryClient();

  const createPost = useCreatePostMutation<CreatePostMutation | Error>(
    graphqlRequestClient,
    {
      onSuccess: (data: CreatePostMutation) => {
        queryClient.invalidateQueries("Posts");
        toast("Post Added");
      },
    }
  );

  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={async (values) => {
          createPost.mutate(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="title" />
            <TextAreaField
              name="description"
              placeholder="description"
              label="description"
            />
            <Button text="Create Post" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default createPost;
