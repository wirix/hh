import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

import { apiRoutes } from "@/utils";

export const useRespondVacancy = ({
  vacancyId,
}: {
  vacancyId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmitRespond = async () => {
    try {
      const vacancyRes = await apiRoutes.vacancy.get(vacancyId);
      console.log("🚀 ~ onSubmitRespond ~ vacancyRes:", vacancyRes)
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
