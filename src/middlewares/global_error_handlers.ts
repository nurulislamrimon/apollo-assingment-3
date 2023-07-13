import { ErrorRequestHandler } from "express";
import config from "../config/env_config";
import { handleValidationError } from "../errors/handle_validation_error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message;
  let errorMessages;

  if (error.name === "ValidationError") {
    const validationError = handleValidationError(error);
    statusCode = validationError.statusCode;
    message = validationError.message;
    errorMessages = validationError.errorMessages;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  }
  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "development" ? undefined : error.stack,
  });
};

export default globalErrorHandler;
