import * as z from "zod"
import * as imports from "../null"

export const EmailSentModel = z.object({
  id: z.number().int(),
  to: z.string(),
  subject: z.string(),
  html: z.string(),
  createdAt: z.date(),
})
