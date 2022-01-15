import { useField } from "formik";
import React, { FC, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputField: FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div className="">
      {error ? <span className="text-red-600">{error}</span> : null}
      <label htmlFor={field.name}>{label}</label>
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputField;
