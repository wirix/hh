import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

import { $api } from "@/app/helpers";

export const useRespondVacancy = ({
  userId,
  vacancyId,
}: {
  userId: string;
  vacancyId: string;
}) => {
  console.log(userId, vacancyId);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmitRespond = async () => {
    try {
      const res = await $api.get(`./vacancy/${vacancyId}`);
      const feedback = await $api.post("./feedback", {
        userId,
        vacancyId,
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 400) {
        toast.error(
          'Вы не можете откликнуться без резюме. Вкладка "Мое резюме".',
        );
      }
    }
  };

	return {state: { isPending }, functions: { onSubmitRespond }}
};
