"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: { children: ReactNode }) => {
  if (typeof window !== undefined) {
    const root = document.getElementById("__next")!;
    return createPortal(children, root);
  } else {
    return null;
  }
};
