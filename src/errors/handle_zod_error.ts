import { ZodError, ZodIssue } from "zod";
import { IGenericErrorMessage } from "../interfaces/i_generic_error_message";

export const handleZodError = (error: ZodError) => {
  const errorMessages: IGenericErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    }
  );

  return { message: "Zod validation error!", errorMessages };
};
