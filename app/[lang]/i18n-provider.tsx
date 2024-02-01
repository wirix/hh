"use client";

import {
  createContext,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { i18n } from "@/i18n.config";
import type { DictionaryByLocale, Locale } from "@/libs/dictionary";

interface II18NContext {
  currentLang: Locale;
  changeLang: (lang: Locale) => void;
}

export const I18NContext = createContext({
  currentLang: i18n.defaultLocale,
  changeLang: (lang: Locale) => {},
} as II18NContext);

export const dictionaries = {
  ru: () => import("@/locales/ru.json").then((module) => module.default),
  en: () => import("@/locales/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export function I18NProvider({
  children,
  lang,
  dictionary,
}: {
  children: ReactNode;
  lang: Locale;
  dictionary: DictionaryByLocale;
}) {
  const [currentLang, setCurrentLang] = useState<Locale>(lang);
  const dict = useRef<DictionaryByLocale | null>(null);

  useLayoutEffect(() => {
    dict.current = dictionary;
  }, [currentLang]);
  // const dict = useRef(dict);
  const loadDict = async () => {
    const dict = await getDictionary(currentLang);
    return dict;
  };

  console.log(dict.current);

  const changeLang = (lang: Locale) => {
    setCurrentLang(lang);
  };

  // const t = (key: string) => {
  // 	return dict[key];
  // }

  return (
    <I18NContext.Provider value={{ currentLang, changeLang }}>
      {children}
    </I18NContext.Provider>
  );
}
