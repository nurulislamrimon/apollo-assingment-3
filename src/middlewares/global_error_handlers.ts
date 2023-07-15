import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config/env_config";
import { handleValidationError } from "../errors/handle_validation_error";
import ApiError from "../errors/api_error";
import { handleZodError } from "../errors/handle_zod_error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message;
  let errorMessages;

  if (error.name === "ValidationError") {
    const validationError = handleValidationError(error);
    statusCode = validationError.statusCode;
    message = validationError.message;
    errorMessages = validationError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    message = zodError.message;
    errorMessages = zodError.errorMessages;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else {
    message = error.message;
  }

  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "development" ? undefined : error.stack,
  });
};

export default globalErrorHandler;
