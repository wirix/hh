"use server";

import { Forum } from "./components/forum";
import { ServerComp } from "./components/serverComp";
import MyProvider from "./I18n-provider";

export default async function Test({
  params: { lang },
}: {
  params: { lang: string };
}) {
  console.log("🚀 ~ Test ~ params:", lang);
  return (
    <MyProvider lang={lang}>
      <div className="dark:text-white">
        <Forum />
        <ServerComp />
      </div>
    </MyProvider>
  );
}
