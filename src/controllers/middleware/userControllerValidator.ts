import { AnyZodObject, z } from "zod";
import { Validator } from "../../middlewares/Validator";

export const userSchema: AnyZodObject = z.object({
  first_name: z
    .string({
      required_error: "name is required.",
      invalid_type_error: "name must be a string",
    })
    .trim()
    .min(1, "name cannot be empty")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  middle_name: z
    .string({
      required_error: "middle name is required.",
      invalid_type_error: "middle name must be a string",
    }).trim()
    .min(1, "name cannot be empty")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  last_name: z
    .string({
      required_error: "fees is required.",
      invalid_type_error: "fees must be a string",
    })
    .trim()
    .min(1, "please provide an amount")
    .max(10, "must not be more than 10 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  name_extension: z
    .string({
      required_error: "name_extension is required.",
      invalid_type_error: "name_extension must be a string",
    })
    .trim()
    .min(1, "please provide a name_extension")
    .max(10, "must not be more than 10 characters")
    .regex(/^[A-Za-z\s]+$/, "name_extension should contain only letters"),
    email: z
    .string({
      required_error: "email is required.",
      invalid_type_error: "email must be a string",
    })
    .trim()
    .min(1, "please provide a medium"),
    password: z
    .string({
      required_error: "password is required.",
      invalid_type_error: "password must be a string",
    })
    .trim()
    .min(1, "please provide a password")
}).strict()
;

export const validatorUser = new Validator().execute(userSchema);
