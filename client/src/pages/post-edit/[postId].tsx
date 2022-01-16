import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  PostQuery,
  usePostQuery,
  useUpdatePostMutation,
  UpdatePostMutation,
} from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import Button from "../../ui/Button";
import InputField from "../../ui/InputField";
import TextAreaField from "../../ui/TextAreaField";

interface IPostQuery extends PostQuery, Error {}

const PostId = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  let id = Number(router.query.postId);

  const { data: postData, refetch } = usePostQuery<PostQuery | Error>(
    graphqlRequestClient,
    { id },
    {
      enabled: false,
    }
  );

  const editPost = useUpdatePostMutation<UpdatePostMutation | Error>(
    graphqlRequestClient,
    {
      onSuccess: (data: UpdatePostMutation) => {
        if (data.updatePost.errors) {
          toast.error(
            `${data.updatePost.errors[0].field}: ${data.updatePost.errors[0].message} `
          );
        } else {
          queryClient.invalidateQueries("Posts");
          queryClient.invalidateQueries("Post");
          toast.success("Update Post ./.");
        }
      },
    }
  );

  const isTitleNotEmpty = postData?.post?.title ? postData?.post.title : "";
  const isDescriptionNotEmpty = postData?.post?.description
    ? postData?.post.description
    : "";

  React.useEffect(() => {
    if (!router.isReady) return;

    refetch();
  }, [router.isReady]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        title: isTitleNotEmpty,
        description: isDescriptionNotEmpty,
      }}
      onSubmit={async (values) => {
        editPost.mutate({
          id,
          description: values.description,
          title: values.title,
        });
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
            text="Update Post"
            variant="secondary"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default PostId;
