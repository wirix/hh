"use client";

import { useContext } from "react";

import { MyContext } from "../I18n-provider";

export const Forum = () => {
  const context = useContext(MyContext);
  console.log("🚀 ~ Test ~ context:", context.currentLang);
  return <div className="dark:text-white">Forum</div>;
};
