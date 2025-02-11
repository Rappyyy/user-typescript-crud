import { AnyZodObject, z } from "zod"


export const StudentSchema: AnyZodObject = z.object({
    name: z
      .string({
        required_error: "title is required.",
        invalid_type_error: "title must be a string",
      })
      .trim()
      .min(1, "title cannot be empty"),
    roll_no: z
      .string({
        required_error: "description is required.",
        invalid_type_error: "description must be a string",
      })
      .trim()
      .min(6, "description must more than 5 characters"),
      fees:z
      .string({
        required_error: "description is required.",
        invalid_type_error: "description must be a string",
      })
  })
  