"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { useEffect, useState } from "react";

interface IProviderTheme extends ThemeProviderProps {}

export const ProviderTheme = ({ children, ...props }: IProviderTheme) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class" {...props}>
      {children}
    </ThemeProvider>
  );
};
