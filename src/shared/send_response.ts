import { Response } from "express";
interface ISendResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    count: number;
  };
  data?: T | null;
}

export const sendResponse = <T>(res: Response, data: ISendResponse<T>) => {
  res.status(data.statusCode).send({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || undefined,
    meta: data.meta || undefined,
    data: data.data || undefined,
  });
};
