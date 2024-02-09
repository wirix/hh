"use client";

import type { Feedback, Resume, User, Vacancy } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { HTag } from "@/app/components";
import { apiTypedRoutes } from "@/utils";

import { ResponderItem } from "./ResponderItem";
import { ResumeCard } from "./ResumeCard";

export type UserType = User & {
  resume: Resume | null;
  feedback: (Feedback | null)[];
};

type VacancyType = Vacancy & {
  responders: UserType[];
};

export const Content = ({ vacancy }: { vacancy: VacancyType }) => {
  const router = useRouter();
  const [idCandidate, setIdCandidate] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const onResumeClick = useCallback((id: string) => {
    setIsFetching(false);
    setIdCandidate(id);
  }, []);

  const onInviteClick = async (isInvite: boolean) => {
    if (!idCandidate) return;

    const data = {
      userId: idCandidate,
      vacancyId: vacancy.id,
      isInvite,
    };

    try {
      setIsFetching(true);
      const res = await apiTypedRoutes.feedback.post(data);
    } catch (e: any) {
      console.log(e);
    } finally {
      router.refresh();
      setIdCandidate(null);
      setIsFetching(false);
    }
  };

  return (
    <div>
      <HTag className="mb-8" tag="h2">
        Список откликнувшихся:
      </HTag>
      <div className="flex justify-between gap-8">
        <div className="w-max">
          {vacancy?.responders.map((user, i) => (
            <ResponderItem
              key={user.id}
              user={user}
              index={i}
              onResumeClick={onResumeClick}
            />
          ))}
        </div>
        {idCandidate ? (
          <ResumeCard
            isFetching={isFetching}
            onInviteClick={onInviteClick}
            user={
              vacancy.responders.filter(
                (responder) => responder.id === idCandidate,
              )[0]
            }
          />
        ) : (
          <div>Выберите следующих кандидатов.</div>
        )}
      </div>
    </div>
  );
};
