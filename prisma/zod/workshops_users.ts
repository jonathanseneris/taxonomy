import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, Completeworkshops, RelatedworkshopsModel } from "./index"

export const workshops_usersModel = z.object({
  workshops_id: z.string(),
  users_id: z.string(),
})

export interface Completeworkshops_users extends z.infer<typeof workshops_usersModel> {
  users: CompleteUser
  workshops: Completeworkshops
}

/**
 * Relatedworkshops_usersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedworkshops_usersModel: z.ZodSchema<Completeworkshops_users> = z.lazy(() => workshops_usersModel.extend({
  users: RelatedUserModel,
  workshops: RelatedworkshopsModel,
}))
