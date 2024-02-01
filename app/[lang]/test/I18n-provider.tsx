"use client";

import { createContext, ReactNode, useState } from "react";

export const MyContext = createContext({
  currentLang: "en",
  handler: (lang: string) => {},
});

export default function MyProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  const [currentLang, setCurrentLang] = useState(lang);

  const handler = (lang: string) => {
    setCurrentLang(lang);
  };

  return (
    <MyContext.Provider value={{ currentLang, handler }}>
      {children}
    </MyContext.Provider>
  );
}
