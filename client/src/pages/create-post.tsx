import React from "react";
import { Form, Formik } from "formik";

const createPost = () => {
  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={() => {}}
      ></Formik>
    </div>
  );
};

export default createPost;
