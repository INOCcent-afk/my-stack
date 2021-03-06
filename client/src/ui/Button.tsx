import React, { ButtonHTMLAttributes, FC } from "react";

const variantClassnames = {
  primary: "bg-white text-gray-800 hover:bg-slate-200",
  secondary: "bg-gray-800 text-white hover:bg-gray-900",
  success: "bg-green-800 text-white hover:bg-green-900",
  error: "bg-red-800 text-white hover:bg-red-900",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: keyof typeof variantClassnames;
}

type OmitButtonProps = Omit<ButtonProps, "className">;

const Button: FC<OmitButtonProps> = ({
  text,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={`font-bold py-1 px-5 rounded-md ${variantClassnames[variant]}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
