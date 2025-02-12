import { AnyZodObject, z } from "zod";
import { Validator } from "../../middlewares/Validator";

export const userSchema: AnyZodObject = z.object({
  name: z
    .string({
      required_error: "name is required.",
      invalid_type_error: "name must be a string",
    })
    .trim()
    .min(1, "name cannot be empty")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  roll_no: z
    .number({
      required_error: "roll_no is required.",
      invalid_type_error: "roll_no must be a string",
    })
    .min(6, "roll_no must be more than 5 characters"),
  fees: z
    .string({
      required_error: "fees is required.",
      invalid_type_error: "fees must be a string",
    })
    .trim()
    .min(1, "please provide an amount")
    .max(10, "must not be more than 10 characters"),
  medium: z
    .string({
      required_error: "medium is required.",
      invalid_type_error: "medium must be a string",
    })
    .trim()
    .min(1, "please provide a medium")
    .max(10, "must not be more than 10 characters"),
}).strict()
;

export const validatorUser = new Validator().execute(userSchema);
