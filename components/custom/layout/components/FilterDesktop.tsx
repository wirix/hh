"use client";

import { City, ExperienceTime, ScheduleWork } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";

import { SalaryEnum } from "@/app/(pages)/(worker)/vacancies/layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterDesktopProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  salaryOptions: Readonly<
    {
      countVacancies: number;
      data: number;
      id: string;
    }[]
  >;
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
  salary: {
    value: string;
    countVacancies: { [key in SalaryEnum]: number };
  };
}

const schedulesJobOptions = [
  {
    value: ScheduleWork.FULL_DAY,
    label: "Полный день",
  },
  {
    value: ScheduleWork.REMOTE,
    label: "Удаленная работа",
  },
  { value: ScheduleWork.FLEX, label: "Гибкий день" },
];
//пока не используется. для того чтобы vacancies получал параметры по умолчанию
//все если добавится в фильтр здесь новый график, так со остальными также
export const allSchedulesValues = schedulesJobOptions.map(
  (option) => option.value,
);

const jobExperienceTimeOptions = [
  { value: ExperienceTime.NOT, label: "Нет опыта" },
  {
    value: ExperienceTime.FROM_ONE_TO_THREE,
    label: "От 1 года до 3 лет",
  },
  {
    value: ExperienceTime.FROM_THREE_TO_SIX,
    label: "От 3 до 6 лет",
  },
  {
    value: ExperienceTime.SIX_MORE,
    label: "Более 6 лет",
  },
] as const;

const citiesOptions = [
  { value: City.MOSCOW, label: "Москва" },
  {
    value: City.SAINT_PETERSBURG,
    label: "Санкт-Петербург",
  },
  { value: City.KRASNOYARSK, label: "Красноярск" },
] as const;

export const FilterDesktop = ({
  salaryOptions,
  className,
  ...props
}: FilterDesktopProps) => {
  const router = useRouter();
  const searchParams = new URLSearchParams();
  // вынести в стор для хранения текущих параметров, redux-toolkit
  const [filterParams, setFilterParams] = useState<FilterParams>({
    isAscendDate: { value: true, countVacancies: 111 },
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
      value: salaryOptions[0].data.toString(),
      countVacancies: {
        [SalaryEnum.RANGE_1]: 111,
        [SalaryEnum.RANGE_2]: 111,
        [SalaryEnum.RANGE_3]: 111,
        [SalaryEnum.RANGE_4]: 111,
      },
    },
  });

  const handleIsAscendDateChange = (value: "true" | "false") => {
    setFilterParams((prev) => ({
      ...prev,
      isAscendDate: {
        ...prev.isAscendDate,
        value: value === "true",
      },
    }));
  };

  const handleSchedulesWorkChange = (value: ScheduleWork) => {
    setFilterParams((prev) => {
      const newSchedulesWork = new Set(prev.schedulesWork.value);
      if (newSchedulesWork.has(value)) {
        newSchedulesWork.delete(value);
      } else {
        newSchedulesWork.add(value);
      }
      return {
        ...prev,
        schedulesWork: {
          ...prev.schedulesWork,
          value: newSchedulesWork,
        },
      };
    });
  };

  const handlExperienceTimeChange = (value: ExperienceTime) => {
    setFilterParams((prev) => ({
      ...prev,
      experienceTime: {
        ...prev.experienceTime,
        value,
      },
    }));
  };

  const handleCitiesChange = (value: City) => {
    setFilterParams((prev) => {
      const newCitiesWork = new Set(prev.cities.value);
      if (newCitiesWork.has(value)) {
        newCitiesWork.delete(value);
      } else {
        newCitiesWork.add(value);
      }
      return {
        ...prev,
        cities: {
          ...prev.cities,
          value: newCitiesWork,
        },
      };
    });
  };

  const handleSalaryChange = (value: string) => {
    setFilterParams((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        value,
      },
    }));
  };

  useEffect(() => {
    searchParams.set(
      "isAscendDate",
      filterParams.isAscendDate.value.toString(),
    );
    searchParams.set(
      "schedulesWork",
      Array.from(filterParams.schedulesWork.value).join(","),
    );
    searchParams.set("experienceTime", filterParams.experienceTime.value);
    searchParams.set("cities", Array.from(filterParams.cities.value).join(","));
    searchParams.set("salary", filterParams.salary.value);
    router.push(`/vacancies?${searchParams.toString()}`);
    router.refresh();
  }, [filterParams]);

  return (
    <div className={className} {...props}>
      <div>
        <Select
          onValueChange={handleIsAscendDateChange}
          defaultValue={String(filterParams.isAscendDate.value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={
                filterParams.isAscendDate.value
                  ? "Сначала новые"
                  : "Сначала старые"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                disabled={filterParams.isAscendDate.value}
                value={"true"}
              >
                Сначала новые
              </SelectItem>
              <SelectItem
                disabled={!filterParams.isAscendDate.value}
                value={"false"}
              >
                Сначала старые
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 font-bold">График работы</h3>
        {schedulesJobOptions.map((option) => (
          <span
            key={option.value}
            className="mb-2 flex select-none items-center"
          >
            <Checkbox
              checked={filterParams.schedulesWork.value.has(option.value)}
              onCheckedChange={(_) => handleSchedulesWorkChange(option.value)}
              id={option.value}
              className="mr-1"
            />
            <label
              htmlFor={option.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
            <span className="ml-2 italic text-gray-400">111</span>
          </span>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="mb-2 font-bold">Опыт работы</h3>
        <RadioGroup
          defaultValue="NOT"
          onValueChange={handlExperienceTimeChange}
        >
          {jobExperienceTimeOptions.map((option) => (
            <div
              key={option.value}
              className="flex select-none items-center space-x-2"
            >
              <RadioGroupItem value={option.value} id={option.value} />
              <Label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={option.value}
              >
                {option.label}
              </Label>
              <span className="ml-2 italic text-gray-400">111</span>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 font-bold">Регионы</h3>
        {citiesOptions.map((option) => (
          <span
            key={option.value}
            className="mb-2 flex select-none items-center"
          >
            <Checkbox
              checked={filterParams.cities.value.has(option.value)}
              onCheckedChange={(_) => handleCitiesChange(option.value)}
              id={option.value}
              className="mr-1"
            />
            <label
              htmlFor={option.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
            <span className="ml-2 italic text-gray-400">111</span>
          </span>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="mb-2 font-bold">Уровень дохода</h3>
        <RadioGroup
          defaultValue={filterParams.salary.value}
          onValueChange={handleSalaryChange}
        >
          {salaryOptions.map((option) => {
            if (!option.countVacancies) {
              return null;
            }
            return (
              <div
                key={option.id}
                className="flex select-none items-center space-x-2"
              >
                <RadioGroupItem value={String(option.data)} id={option.id} />
                <Label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor={option.id}
                >
                  От {option.data}руб
                </Label>
                <span className="ml-2 italic text-gray-400">
                  {option.countVacancies}
                </span>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};
