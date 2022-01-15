import { useField } from "formik";
import React, { FC, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputField: FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div className="flex flex-col gap-3 w-full">
      {error ? <span className="text-red-600">{error}</span> : null}
      <label htmlFor={field.name} className="font-bold text-gray-800 text-xl">
        {label}
      </label>
      <input
        className="p-3 border-gray-300 border rounded-md"
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputField;
