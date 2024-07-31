"use client";

import { City, ExperienceTime, ScheduleWork } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useMemo } from "react";

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
import { SalaryEnum, useFilterParamsStore } from "@/store";

interface FilterDesktopProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  salaryOptions: {
    count: number;
    value: number;
  }[];
}

export const FilterDesktop = ({
  salaryOptions,
  className,
  ...props
}: FilterDesktopProps) => {
  const router = useRouter();

  const {
    filterParams,
    setIsAscendDate,
    setSchedulesWork,
    setExperienceTime,
    setCities,
    setSalary,
    setCountVacancies,
  } = useFilterParamsStore();

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set(
      "salary",
      filterParams.salary.countVacancies[
        filterParams.salary.value
      ].value.toString(),
    );
    params.set(
      "schedulesWork",
      Array.from(filterParams.schedulesWork.value).join(","),
    );
    params.set("isAscendDate", filterParams.isAscendDate.value.toString());
    params.set("cities", Array.from(filterParams.cities.value).join(","));
    params.set("experienceTime", filterParams.experienceTime.value);
    params.set("page", filterParams.activePage.toString());
    return params;
  }, [filterParams]);

  useEffect(() => {
    setCountVacancies(salaryOptions);
  }, []);

  useEffect(() => {
    router.push(`/vacancies?${searchParams}`);
    router.refresh();
  }, [filterParams, router]);

  return (
    <div className={className} {...props}>
      <div>
        <Select
          onValueChange={(value) => setIsAscendDate(value === "true")}
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
                onCheckedChange={(_) => setSchedulesWork(option)}
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
        <RadioGroup defaultValue="NOT" onValueChange={setExperienceTime}>
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
                onCheckedChange={(_) => setCities(option)}
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
          defaultValue={filterParams.salary.value.toString()}
          onValueChange={(e) => setSalary(e as unknown as SalaryEnum)}
        >
          {salaryOptions.map((option, index) => {
            if (!option.count) {
              return null;
            }
            return (
              <div
                key={index}
                className="flex select-none items-center space-x-2"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={index.toString()}
                />
                <Label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor={index.toString()}
                >
                  От {option.value}руб
                </Label>
                <span className="ml-2 italic text-gray-400">
                  {option.count}
                </span>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};
