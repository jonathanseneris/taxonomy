import * as z from "zod"
import * as imports from "../null"

export const TagModel = z.object({
  name: z.string(),
  category: z.string().nullish(),
  displayName: z.string(),
})
