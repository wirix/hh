"use client";

import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

import { Button, Card, PTag } from "@/components/custom";
import { cn } from "@/utils";

import type { UserType } from "./Content";

export interface IResumeCard
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  user: UserType;
  isFetching: boolean;
  onInviteClick: (isInvite: boolean) => void;
}

export const ResumeCard = ({
  user,
  onInviteClick,
  isFetching,
}: IResumeCard) => {
  const isInvite = user.feedback[0]?.isInvite;

  return (
    <Card
      color="whiteShadow"
      className="relative h-[400px] w-full bg-sky-900 p-4 dark:shadow-none"
    >
      <div className="h-[320px] overflow-auto">
        <PTag color="black" size="xl" className="font-semibold">
          Должность: {user.resume?.namePosition}
        </PTag>
        <PTag color="black" size="xl" className="font-semibold">
          Имя: {user.name}
        </PTag>
        <PTag color="black" size="xl" className="font-semibold">
          Возраст: {user.resume?.age}
        </PTag>
        <PTag color="black" size="xl" className="font-semibold">
          Гражданство: {user.resume?.country}, {user.resume?.city}
        </PTag>
        <div className="text-xl font-semibold text-black dark:text-white">
          О себе:
        </div>
        <PTag color="black" size="base" className="ml-4">
          {user.resume?.text}
        </PTag>
      </div>
      <div className={cn("absolute bottom-4 right-4")}>
        {isInvite === null && !isFetching ? (
          <>
            <Button
              color={"green"}
              className="mr-4"
              onClick={() => onInviteClick(true)}
            >
              Приглашение
            </Button>
            <Button color="red" onClick={() => onInviteClick(false)}>
              Отказ
            </Button>
          </>
        ) : isFetching ? (
          <Button color={"gray"} disabled>
            Отправка...
          </Button>
        ) : (
          <Button disabled color={isInvite ? "green" : "red"}>
            {isInvite ? "Приглашен" : "Отказ"}
          </Button>
        )}
      </div>
    </Card>
  );
};
