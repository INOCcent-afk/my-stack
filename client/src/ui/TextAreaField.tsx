import { useField } from "formik";
import React, { FC, InputHTMLAttributes } from "react";

interface TextAreaFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextAreaField: FC<TextAreaFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div className="">
      {error ? <span className="text-red-600">{error}</span> : null}
      <label htmlFor={field.name}>{label}</label>
      <textarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
