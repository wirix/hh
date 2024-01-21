"use client";

import classNames from "classnames";
import Image from "next/image";
import React, { DetailedHTMLProps } from "react";
import { CgProfile } from "react-icons/cg";

import { Button, Card } from "@/app/components";

import { UserType } from "./Content";

interface IResponderItem
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  user: UserType;
  index: number;
  onResumeClick: (id: string) => void;
}

export const ResponderItem = ({ user, onResumeClick }: IResponderItem) => {
  if (!user) {
    return <div>Нет данных о пользователе.</div>;
  }

  return (
    <Card
      color="whiteShadow"
      className="relative mb-4 flex items-center overflow-hidden bg-slate-800 p-2 last:mb-0"
    >
      <span
        className={classNames("absolute left-0 h-full w-1", {
          ["bg-green-600"]: user.feedback[0]?.isInvite === true,
          ["bg-red-600"]: user.feedback[0]?.isInvite === false,
          ["bg-gray-600"]: user.feedback[0]?.isInvite === null,
        })}
      ></span>
      <div className="mr-2">
        {user.image ? (
          <Image width={50} height={50} src={user.image} alt="profile" />
        ) : (
          <CgProfile size="50px" />
        )}
      </div>
      <div className="relative flex items-center">
        <div className="w-80">
          <div>Должность: {user.resume?.namePosition.slice(0, 24)}</div>
          <div>Возраст: {user.resume?.age}</div>
        </div>
        <Button className="w-max" onClick={() => onResumeClick(user.id)}>
          Посмотреть резюме
        </Button>
      </div>
    </Card>
  );
};
