import { Response } from "express";
interface ISendResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    totalDocuments: number;
  };
  data?: T | null;
}

export const sendResponse = <T>(res: Response, data: ISendResponse<T>) => {
  res.status(data.statusCode).send({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  });
};
