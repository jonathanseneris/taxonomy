import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, Completeworkshops, RelatedworkshopsModel } from "./index"

export const users_workshopsModel = z.object({
  users_id: z.string(),
  workshops_id: z.string(),
})

export interface Completeusers_workshops extends z.infer<typeof users_workshopsModel> {
  users: CompleteUser
  workshops: Completeworkshops
}

/**
 * Relatedusers_workshopsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedusers_workshopsModel: z.ZodSchema<Completeusers_workshops> = z.lazy(() => users_workshopsModel.extend({
  users: RelatedUserModel,
  workshops: RelatedworkshopsModel,
}))
