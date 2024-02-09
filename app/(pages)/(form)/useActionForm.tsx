"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { IResponseAction } from "./response-types";

export function useActionForm<T>(
  action: (prevState: any, formData: FormData) => Promise<IResponseAction<T>>,
) {
  const router = useRouter();
  const [state, actionForm] = useFormState(action, null);

  useEffect(() => {
    if (!state) return;

    if ("data" in state) {
      toast.success(state.message);
      router.push("/");
    } else if ("serverErrorMessage" in state) {
      toast.warning(state.serverErrorMessage);
    }
  }, [state]);

  return { state, actionForm };
}
