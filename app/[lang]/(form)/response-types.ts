import { ZodFormattedError } from "zod";

type IResponseSuccessAction<FormData> = {
  data: FormData;
  message: string;
};

type IResponseServerError = {
  serverErrorMessage: string;
};

type IResponseErrorAction<FormData> = {
  error: ZodFormattedError<FormData>;
};

export type IResponseAction<FormData> =
  | IResponseSuccessAction<FormData>
  | IResponseServerError
  | IResponseErrorAction<FormData>;
