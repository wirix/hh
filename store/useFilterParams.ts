import { City, ExperienceTime, ScheduleWork } from "@prisma/client";
import { create } from "zustand";

// Уровень зарплаты
export enum SalaryEnum {
  RANGE_1 = 0,
  RANGE_2 = 1,
  RANGE_3 = 2,
  RANGE_4 = 3,
}

interface Option<T> {
  value: T;
  countVacancies: number;
}

interface FilterParams {
  isAscendDate: Option<boolean>;
  schedulesWork: Option<Set<ScheduleWork>>;
  experienceTime: Option<ExperienceTime>;
  cities: Option<Set<City>>;
  activePage: number;
  salary: {
    value: SalaryEnum;
    countVacancies: Record<string, number>[];
  };
}

interface FilterParamsState {
  filterParams: FilterParams;
  setIsAscendDate: (value: boolean) => void;
  setSchedulesWork: (value: ScheduleWork) => void;
  setExperienceTime: (value: ExperienceTime) => void;
  setCities: (value: City) => void;
  setSalary: (value: SalaryEnum) => void;
  setActivePage: (value: number) => void;
  setCountVacancies: (
    value: {
      count: number;
      value: number;
    }[],
  ) => void;
}

export const useFilterParamsStore = create<FilterParamsState>((set) => ({
  filterParams: {
    isAscendDate: { value: true, countVacancies: 111 },
    activePage: 1,
    schedulesWork: {
      value: new Set([
        ScheduleWork.FULL_DAY,
        ScheduleWork.REMOTE,
        ScheduleWork.FLEX,
      ]),
      countVacancies: 111,
    },
    experienceTime: {
      value: ExperienceTime.NOT,
      countVacancies: 111,
    },
    cities: {
      value: new Set([City.MOSCOW]),
      countVacancies: 111,
    },
    salary: {
      value: SalaryEnum.RANGE_1, // выбранный уровень зарплаты
      countVacancies: [
        {
          count: 111, // количество вакансий
          value: 111, // зарплата
        },
        {
          count: 111,
          value: 111,
        },
        {
          count: 111,
          value: 111,
        },
        {
          count: 111,
          value: 111,
        },
      ],
    },
  },
  setIsAscendDate: (value) =>
    set((state) => ({
      filterParams: {
        ...state.filterParams,
        isAscendDate: { ...state.filterParams.isAscendDate, value },
        activePage: 1,
      },
    })),
  setSchedulesWork: (value) =>
    set((state) => {
      const newSchedulesWork = new Set(state.filterParams.schedulesWork.value);
      if (newSchedulesWork.has(value)) {
        newSchedulesWork.delete(value);
      } else {
        newSchedulesWork.add(value);
      }
      return {
        filterParams: {
          ...state.filterParams,
          schedulesWork: {
            ...state.filterParams.schedulesWork,
            value: newSchedulesWork,
          },
          activePage: 1,
        },
      };
    }),
  setExperienceTime: (value) =>
    set((state) => ({
      filterParams: {
        ...state.filterParams,
        experienceTime: { ...state.filterParams.experienceTime, value },
        activePage: 1,
      },
    })),
  setCities: (value) =>
    set((state) => {
      const newCities = new Set(state.filterParams.cities.value);
      if (newCities.has(value)) {
        newCities.delete(value);
      } else {
        newCities.add(value);
      }
      return {
        filterParams: {
          ...state.filterParams,
          cities: { ...state.filterParams.cities, value: newCities },
          activePage: 1,
        },
      };
    }),
  setSalary: (value: SalaryEnum) =>
    set((state) => ({
      filterParams: {
        ...state.filterParams,
        salary: { ...state.filterParams.salary, value },
        activePage: 1,
      },
    })),
  setCountVacancies: (value) =>
    set((state) => ({
      filterParams: {
        ...state.filterParams,
        salary: { ...state.filterParams.salary, countVacancies: value },
        activePage: 1,
      },
    })),
  setActivePage: (value) =>
    set((state) => ({
      filterParams: {
        ...state.filterParams,
        activePage: value,
      },
    })),
}));
