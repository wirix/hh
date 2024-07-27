import { City, ExperienceTime, ScheduleWork } from "@prisma/client";

export const SCHEDULE_WORK_OPTIONS: Record<ScheduleWork, string> = {
  [ScheduleWork.FULL_DAY]: "Полный день",
  [ScheduleWork.REMOTE]: "Удаленная работа",
  [ScheduleWork.FLEX]: "Гибкий день",
} as const;

export const EXPERIENCE_TIME_OPTIONS: Record<ExperienceTime, string> = {
  [ExperienceTime.NOT]: "Нет опыта",
  [ExperienceTime.FROM_ONE_TO_THREE]: "От 1 года до 3 лет",
  [ExperienceTime.FROM_THREE_TO_SIX]: "От 3 до 6 лет",
  [ExperienceTime.SIX_MORE]: "Более 6 лет",
} as const;

export const CITY_OPTIONS: Record<City, string> = {
  [City.MOSCOW]: "Москва",
  [City.SAINT_PETERSBURG]: "Санкт-Петербург",
  [City.KRASNOYARSK]: "Красноярск",
} as const;
