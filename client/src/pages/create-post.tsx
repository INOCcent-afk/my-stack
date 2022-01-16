import React from "react";
import { Form, Formik } from "formik";
import { useQueryClient } from "react-query";
import {
  CreatePostMutation,
  MeQuery,
  useCreatePostMutation,
  useMeQuery,
} from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { toast } from "react-toastify";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import Button from "../ui/Button";

const createPost = () => {
  const queryClient = useQueryClient();

  const { data } = useMeQuery<MeQuery | null | undefined>(graphqlRequestClient);

  const createPost = useCreatePostMutation<CreatePostMutation | Error>(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Posts");
        toast("Post Added");
      },
    }
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        creator: data?.me?.id as number,
        title: "",
        description: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        createPost.mutate(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-start gap-3">
          <InputField name="title" placeholder="Title" label="Title" />
          <TextAreaField
            name="description"
            placeholder="Description"
            label="Description"
          />
          <Button
            type="submit"
            text="Create Post"
            variant="secondary"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default createPost;
