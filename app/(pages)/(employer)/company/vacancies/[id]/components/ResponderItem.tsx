import { Button, Card } from '@/app/components';
import { Feedback, Resume, User } from '@prisma/client';
import classNames from 'classnames';
import Image from 'next/image';
import React, { DetailedHTMLProps } from 'react';
import { CgProfile } from 'react-icons/cg';

interface IResponderItem
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: User & {
    resume: Resume | null;
    feedback: (Feedback | null)[];
  };
  index: number;
  onResumeClick: (newIndexResume: number) => void;
}

export const ResponderItem = ({ user, onResumeClick, index }: IResponderItem) => {
  if (!user) {
    return <div>Нет данных о пользователе.</div>;
  }

  return (
    <Card color='gray' className="flex items-center bg-slate-800 p-2 mb-4 last:mb-0 relative overflow-hidden">
      <span
        className={classNames('absolute left-0 w-1 h-full', {
          ['bg-green-600']: user.feedback[0]?.isInvite === true,
          ['bg-red-600']: user.feedback[0]?.isInvite === false,
          ['bg-gray-600']: user.feedback[0]?.isInvite === undefined,
        })}></span>
      <div className="mr-2">
        {user.image ? (
          <Image width={50} height={50} src={user.image} alt="profile" />
        ) : (
          <CgProfile size="50px" />
        )}
      </div>
      <div className="flex items-center relative">
        <div className="w-80">
          <div>Имя: {user.name}</div>
          <div>Страна: {user.resume?.country}</div>
        </div>
        <Button className="w-max" onClick={() => onResumeClick(index)}>
          Посмотреть резюме
        </Button>
      </div>
    </Card>
  );
};
