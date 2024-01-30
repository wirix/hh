import type { DictionaryByLocale, Locale } from "@/libs/dictionary";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

const translations: Record<Locale, DictionaryByLocale> = { en, ru };

type DeepValue<T, K extends string> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? DeepValue<T[First], Rest>
    : never
  : K extends keyof T
    ? T[K]
    : never;

type RecursiveDictionaryByLocale<T> = {
  [K in keyof T]: T[K] extends object
    ? RecursiveDictionaryByLocale<T[K]>
    : T[K];
};

type ValidatedTranslations<T> = {
  [K in keyof T]: RecursiveDictionaryByLocale<T[K]>;
};

let locale: Locale = 'ru'

export function useTranslation(lang?: Locale) {
	if (lang === 'ru' || lang === 'en') {
    locale = lang
  }

  const t =
	 <T extends keyof ValidatedTranslations<DictionaryByLocale>>(
    key: T,
  ): ValidatedTranslations<DictionaryByLocale>[T] | string => {
    const keys = key.split(".");
		
    let result: ValidatedTranslations<DictionaryByLocale> =
		translations[locale];
		
    keys.forEach((k) => {
			if (result && typeof result === "object") {
				//@ts-ignore
				result = result[k];
      }
    });
		//@ts-ignore
    return result || key;
  };
	
  return { t };
}



// type DeepKeyof<T> = T extends object ? {
	//   [K in keyof T]-?: K | `${K}.${DeepKeyof<T[K]>}`
	// }[keyof T] : never;
	
	// type DeepValue<T, K extends string> = K extends `${infer First}.${infer Rest}`
	//   ? First extends keyof T
	//     ? DeepValue<T[First], Rest>
	//     : never
	//   : K extends keyof T
	//     ? T[K]
	//     : never;
	
	// const { t } = useTranslation<'ru', typeof translations>('ru', {
		//   page: {
//     company: true
//   }
// });


// function validateTranslations<T>(
//   translations: Record<Locale, T>,
// ): ValidatedTranslations<T> {
//   return translations as ValidatedTranslations<T>;
// }

// const validatedTranslations = validateTranslations(translations);