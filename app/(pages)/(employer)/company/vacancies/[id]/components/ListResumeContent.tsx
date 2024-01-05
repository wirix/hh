'use client';

import { Button, Card, HTag } from '@/app/components';
import { ResponderItem } from './ResponderItem';
import { Feedback, Resume, User, Vacancy } from '@prisma/client';
import { useCallback, useState } from 'react';
import { $api } from '@/app/helpers';
import { useRouter } from 'next/navigation';

type IUserType = User & { resume: Resume | null; feedback: (Feedback | null)[] };

type VacancyType = Vacancy & {
  responders: IUserType[];
};

export const ListResumeContent = ({ vacancy }: { vacancy: VacancyType }) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<IUserType | null>(null);
  const [stateFetching, setStateFetching] = useState<'not' | 'isFetching' | 'fullfiled'>('not');

  const onResumeClick = useCallback((newIndexResume: number) => {
    setStateFetching('not');
    setSelectedUser(vacancy.responders[newIndexResume]);
  }, []);

  const onInviteClick = async (isInvite: boolean) => {
    try {
      setStateFetching('isFetching');
      const res = await $api.post('./feedback', {
        userId: selectedUser?.id,
        vacancyId: vacancy.id,
        isInvite,
      });
      setStateFetching('fullfiled');
    } catch (e: any) {
      console.log(e);
      setStateFetching('not');
    } finally {
      router.refresh();
    }
  };

  const getCurrentButton = () => {
    if (!selectedUser) return;

    if (stateFetching === 'not' && selectedUser.feedback[0]?.isInvite === undefined) {
      return (
        <>
          <Button color={'green'} className="mr-4" onClick={() => onInviteClick(true)}>
            Приглашение
          </Button>
          <Button color="red" onClick={() => onInviteClick(false)}>
            Отказ
          </Button>
        </>
      );
    } else if (selectedUser.feedback[0]?.isInvite && !(stateFetching === 'isFetching')) {
      return (
        <Button color={'green'} disabled>
          Приглашён
        </Button>
      );
    } else if (!selectedUser.feedback[0]?.isInvite && !(stateFetching === 'isFetching')) {
      return (
        <Button color={'red'} disabled>
          Отказ
        </Button>
      );
    } else {
      return (
        <Button color={'gray'} disabled>
          Отправка...
        </Button>
      );
    }
  };

  return (
    <div>
      <HTag className="mb-8" tag="h2">
        Список откликнувшихся:
      </HTag>
      <div className="flex gap-8 justify-between">
        <div className="w-max">
          {vacancy?.responders.map((user, i) => (
            <ResponderItem key={user.id} user={user} index={i} onResumeClick={onResumeClick} />
          ))}
        </div>
        {selectedUser !== null && !(stateFetching === 'fullfiled') && (
          <Card color="gray" className="w-full bg-sky-900 p-4 relative h-[400px]">
            <div className="overflow-auto h-[320px]">Данные: {selectedUser.resume?.body}</div>
            <div className="absolute right-4 bottom-4">{getCurrentButton()}</div>
          </Card>
        )}
        {stateFetching === 'fullfiled' && (
          <div>Успешно отправлено! Выберите следующего кандидата.</div>
        )}
      </div>
    </div>
  );
};
