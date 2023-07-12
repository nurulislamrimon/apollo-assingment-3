import { ErrorRequestHandler } from "express";
import config from "../config/env_config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let errorMessages;
  res.status(statusCode).send({
    success: false,
    message: error.message,
    errorMessages,
    stack: config.env !== "development" ? "" : error.stack,
  });
};

export default globalErrorHandler;
