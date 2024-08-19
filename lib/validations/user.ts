import * as z from "zod"

export const userNameSchema = z
  .object({
    name: z.string().min(3).max(96),
    location: z.string(),
    bio: z.string(),
    lookingFor: z.string(),
    workingOn: z.string(),
    isAvailable: z.boolean(),
  })
  .refine(
    (data) =>
      !data.isAvailable || (data.lookingFor && (data.bio || data.workingOn)),
    {
      message:
        "Please fill out what you are looking for, as well as your bio or what you are working on, if you want to be listed in the directory.",
      path: ["isAvailable"], // path of error
    },
  )
