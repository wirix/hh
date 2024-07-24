import Image from "next/image";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { CgProfile } from "react-icons/cg";

import { Button, Card, PTag } from "@/app/components";
import { cn } from "@/lib/utils";

import { UserType } from "./Content";

interface IResponderItem
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
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
      className="relative mb-4 flex items-center overflow-hidden bg-slate-800 p-2 last:mb-0 dark:shadow-none"
    >
      <span
        className={cn("absolute left-0 h-full w-1", {
          ["bg-green-600"]: user.feedback[0]?.isInvite === true,
          ["bg-red-600"]: user.feedback[0]?.isInvite === false,
          ["bg-gray-600"]: user.feedback[0]?.isInvite === null,
        })}
      ></span>
      <div className="mr-2 dark:text-gray-200">
        {user.image ? (
          <Image width={50} height={50} src={user.image} alt="profile" />
        ) : (
          <CgProfile size="50px" />
        )}
      </div>
      <div className="relative flex items-center">
        <div className="w-80">
          <PTag color="gray">
            Должность: {user.resume?.namePosition.slice(0, 24)}
          </PTag>
          <PTag color="gray">Возраст: {user.resume?.age}</PTag>
        </div>
        <Button className="w-max" onClick={() => onResumeClick(user.id)}>
          Посмотреть резюме
        </Button>
      </div>
    </Card>
  );
};
