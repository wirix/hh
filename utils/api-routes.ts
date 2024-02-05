import { ICompanyForm } from "@/app/[lang]/(employer)/company/components";
import { IVacancyForm } from "@/app/[lang]/(employer)/company/vacancies/components";
import { IResumeForm } from "@/app/[lang]/(worker)/resume/components";
import { IFeedback } from "@/app/api/feedback/route";
import { IVacancyResponse } from "@/app/api/vacancy/[vacancyId]/route";

import { fetchCustomTyped } from "./fetch-custom";

interface IStatus {
  status: number;
}

interface IVacancyGet extends IStatus, IVacancyResponse {}

interface IResumePost extends IStatus {}

interface ICompanyPost extends IStatus {}

interface IFeedbackPost extends IStatus {}

interface ILogoutGet extends IStatus {}

export const apiTypedRoutes = {
  vacancy: {
    get: async (id: string) => {
      return await fetchCustomTyped<IVacancyGet>(`/vacancy/${id}`);
    },
  },
  resume: {
    post: async (data: IResumeForm) => {
      return await fetchCustomTyped<IResumePost>(`/resume`, "post", {
        data,
      });
    },
  },
  company: {
    post: async (data: ICompanyForm) => {
      return await fetchCustomTyped<ICompanyPost>(`/company`, "post", {
        data,
      });
    },
  },
  companyVacancy: {
    post: async (data: IVacancyForm) => {
      return await fetchCustomTyped<IFeedbackPost>(`/company/vacancy`, "post", {
        data,
      });
    },
  },
  feedback: {
    post: async (data: IFeedback) => {
      return await fetchCustomTyped<IFeedbackPost>(`/feedback`, "post", {
        data,
      });
    },
  },
  logout: {
    get: async () => {
      return await fetchCustomTyped<ILogoutGet>(`/logout`);
    },
  }
};
