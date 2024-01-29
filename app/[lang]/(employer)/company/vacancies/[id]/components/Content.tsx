"use client";

import type { Feedback, Resume, User, Vacancy } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { HTag } from "@/app/components";
import { $api } from "@/app/helpers";

import { ResponderItem } from "./ResponderItem";
import { ResumeCard } from "./ResumeCard";

export type UserType = User & {
  resume: Resume | null;
  feedback: (Feedback | null)[];
};

type VacancyType = Vacancy & {
  responders: UserType[];
};

export const Content = ({
  vacancy,
}: {
  vacancy: VacancyType;
}) => {
  const router = useRouter();
  const [idCandidate, setIdCandidate] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const onResumeClick = useCallback((id: string) => {
    setIsFetching(false);
    setIdCandidate(id);
  }, []);

  const onInviteClick = async (isInvite: boolean) => {
    if (!idCandidate) return;

    try {
      setIsFetching(true);
      const res = await $api.post("./feedback", {
        userId: idCandidate,
        vacancyId: vacancy.id,
        isInvite,
      });
    } catch (e: any) {
      console.log(e);
    } finally {
      setIdCandidate(null);
      setIsFetching(false);
      router.refresh();
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
