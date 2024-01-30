import { Currency } from "@prisma/client";

export const formatSalary = (salary: number, currency: Currency) => {
  const getLocale = () => {
    switch (currency) {
      case "USD":
        return "en-US";
      case "RUB":
        return "ru-RU";
      default:
        return "en-US";
    }
  };

  const locale = getLocale();

  const intl = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return intl.format(salary);
};
