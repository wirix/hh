import {
  DetailedHTMLProps,
  FC,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import type { FieldError } from "react-hook-form";

import { PTag } from "@/components/custom";
import { cn } from "@/utils";

export interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  ref?: ForwardedRef<HTMLInputElement>;
  error?: FieldError | { message?: string };
  size?: 96 | 60 | 0;
}

export const Input: FC<IInput> = forwardRef(
  ({ error, className, size = 60, ...props }, ref) => {
    return (
      <div
        className={cn(
          `flex flex-col`,
          {
            ["w-60"]: size === 60,
            ["w-96"]: size === 96,
            ["w-0"]: size === 0,
          },
          className,
        )}
      >
        <input
          ref={ref}
          className={
            "rounded border-2 border-gray-700 bg-transparent p-2 text-gray-600 outline-gray-700 dark:text-gray-200"
          }
          {...props}
        />
        {error?.message && (
          <PTag role="alert" className="mb-1 text-red-500">
            {error.message}
          </PTag>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
