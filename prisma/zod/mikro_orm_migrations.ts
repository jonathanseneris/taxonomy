import * as z from "zod"
import * as imports from "../null"

export const mikro_orm_migrationsModel = z.object({
  id: z.number().int(),
  name: z.string().nullish(),
  executed_at: z.date().nullish(),
})
