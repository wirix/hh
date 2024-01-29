import "server-only";

export const dictionaries = {
  ru: () => import("@/locales/ru.json").then((module) => module.default),
  en: () => import("@/locales/en.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export type DictionaryByLocale = Awaited<
ReturnType<(typeof dictionaries)[Locale]>
>;
export type DictionaryPage<Page extends keyof DictionaryByLocale["page"]> =
DictionaryByLocale["page"][Page];
export type LangParamsType = {
  lang: Locale;
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
