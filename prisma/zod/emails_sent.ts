import * as z from "zod"
import * as imports from "../null"

export const emails_sentModel = z.object({
  id: z.number().int(),
  to: z.string(),
  subject: z.string(),
  html: z.string(),
  created_at: z.date(),
})
