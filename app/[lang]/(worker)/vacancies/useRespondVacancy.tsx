import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

import { apiTypedRoutes } from "@/utils";

export const useRespondVacancy = ({ vacancyId }: { vacancyId: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmitRespond = async () => {
    try {
      const sendResumeToVacancy = await apiTypedRoutes.vacancy.get(vacancyId);
      startTransition(() => {
        router.refresh();
      });
    } catch (e: any) {
      if (e.status === 404) {
        toast.error(
          'Вы не можете откликнуться без резюме. Вкладка "Мое резюме".',
        );
      } else if (e.status >= 400) {
        toast.error("Произошла ошибка!");
      }
    }
  };

  return { state: { isPending }, functions: { onSubmitRespond } };
};
