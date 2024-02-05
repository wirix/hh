"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useFormStatus } from "react-dom";

import { Button } from ".";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const SubmitButton = ({ children, color, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      color={pending ? "gray" : "green"}
      disabled={pending}
      {...props}
    >
      {children}
    </Button>
  );
};
