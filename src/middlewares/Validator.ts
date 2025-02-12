import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";

export class Validator {
  execute(schema: AnyZodObject) {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        await schema.parseAsync(request.body);
        next();  // Validation passed, proceed to the next middleware
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Construct a proper error object for the error handler
          const validationError = new Error(
            JSON.stringify(
              error.issues.map((e) => ({
                path: e.path[0],
                message: e.message,
              }))
            )
          );
          (validationError as any).status = 409;  // Attach a status code to the error
          return next(validationError);  // Pass the error to the error-handling middleware
        }
        next(error);  // Pass unexpected errors to the error handler
      }
    };
  }
}
