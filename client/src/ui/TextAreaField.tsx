import { useField } from "formik";
import React, { FC, InputHTMLAttributes } from "react";

interface TextAreaFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextAreaField: FC<TextAreaFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div className="flex flex-col gap-3 w-full">
      {error ? <span className="text-red-600">{error}</span> : null}
      <label className="font-bold text-gray-800 text-xl" htmlFor={field.name}>
        {label}
      </label>
      <textarea
        className="p-3 border border-gray-300 !border-b-2 border-b-gray-800 rounded-md"
        style={{ minHeight: 300 }}
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
