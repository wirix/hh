import cn from "classnames";
import {
  DetailedHTMLProps,
  FC,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import type { FieldError } from "react-hook-form";

import { PTag } from "@/app/components";

export interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  ref?: ForwardedRef<HTMLInputElement>;
  error?: FieldError;
  size?: 96 | 60 | 0;
}

export const Input: FC<IInput> = forwardRef(
  ({ error, className, size = 60, ...props }, ref) => {
    return (
      <div
        className={cn(`flex flex-col`, {
          ["w-60"]: size === 60,
          ["w-96"]: size === 96,
          ["w-0"]: size === 0,
        })}
      >
        <input
          ref={ref}
          className={cn(
            "rounded border-2 border-gray-700 bg-transparent p-2 text-gray-600 outline-gray-700 dark:text-gray-200",
            className,
          )}
          {...props}
        />
        {error && (
          <PTag role="alert" className="mb-2 text-red-500">
            {error.message}
          </PTag>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
