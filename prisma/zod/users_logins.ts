import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel } from "./index"

export const users_loginsModel = z.object({
  id: z.bigint(),
  login_time: z.date(),
  ip_address: z.string(),
  user_id: z.string(),
})

export interface Completeusers_logins extends z.infer<typeof users_loginsModel> {
  users: CompleteUser
}

/**
 * Relatedusers_loginsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedusers_loginsModel: z.ZodSchema<Completeusers_logins> = z.lazy(() => users_loginsModel.extend({
  users: RelatedUserModel,
}))
