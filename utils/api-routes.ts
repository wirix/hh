import { fetchCustomTyped } from "./fetch-custom";

interface IStatus {
  status: 200 | 400 | 401 | 403 | 404 | 407 | 500;
}

interface IVacancyGet extends IStatus {
  isSuccess: boolean;
  isAllReady: boolean;
  message: string;
}

export const apiRoutes = {
  vacancy: {
    get: async (id: string) => {
      return await fetchCustomTyped<IVacancyGet>(`/vacancy/${id}`);
    },
  },
};
