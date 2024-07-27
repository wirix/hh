"use client";

import { City, ExperienceTime, ScheduleWork } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";

import { SalaryEnum } from "@/app/(pages)/(worker)/vacancies/layout";
import {
  CITY_OPTIONS,
  EXPERIENCE_TIME_OPTIONS,
  SCHEDULE_WORK_OPTIONS,
} from "@/components/constants";
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
    searchParams.set("page", "1");
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
        {Object.entries(SCHEDULE_WORK_OPTIONS).map(([key, label]) => {
          const option = key as ScheduleWork;
          return (
            <span key={option} className="mb-2 flex select-none items-center">
              <Checkbox
                checked={filterParams.schedulesWork.value.has(option)}
                onCheckedChange={(_) => handleSchedulesWorkChange(option)}
                id={option}
                className="mr-1"
              />
              <label
                htmlFor={option}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
              <span className="ml-2 italic text-gray-400">111</span>
            </span>
          );
        })}
      </div>
      <div className="mt-4">
        <h3 className="mb-2 font-bold">Опыт работы</h3>
        <RadioGroup
          defaultValue="NOT"
          onValueChange={handlExperienceTimeChange}
        >
          {Object.entries(EXPERIENCE_TIME_OPTIONS).map(([key, label]) => {
            const option = key as ExperienceTime;
            return (
              <div
                key={option}
                className="flex select-none items-center space-x-2"
              >
                <RadioGroupItem value={option} id={option} />
                <Label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor={option}
                >
                  {label}
                </Label>
                <span className="ml-2 italic text-gray-400">111</span>
              </div>
            );
          })}
        </RadioGroup>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 font-bold">Регионы</h3>
        {Object.entries(CITY_OPTIONS).map(([key, label]) => {
          const option = key as City;
          return (
            <span key={option} className="mb-2 flex select-none items-center">
              <Checkbox
                checked={filterParams.cities.value.has(option)}
                onCheckedChange={(_) => handleCitiesChange(option)}
                id={option}
                className="mr-1"
              />
              <label
                htmlFor={option}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
              <span className="ml-2 italic text-gray-400">111</span>
            </span>
          );
        })}
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
