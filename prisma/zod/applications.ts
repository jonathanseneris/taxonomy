import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, Completeworkshops, RelatedworkshopsModel } from "./index"

export const applicationsModel = z.object({
  id: z.string(),
  user_id: z.string(),
  workshop_id: z.string(),
  submitted_on: z.date(),
  viewed_on: z.date(),
  status_changed_on: z.date(),
  status: z.string(),
  statement: z.string(),
  about: z.string(),
  sample: z.string(),
})

export interface Completeapplications extends z.infer<typeof applicationsModel> {
  users: CompleteUser
  workshops: Completeworkshops
}

/**
 * RelatedapplicationsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedapplicationsModel: z.ZodSchema<Completeapplications> = z.lazy(() => applicationsModel.extend({
  users: RelatedUserModel,
  workshops: RelatedworkshopsModel,
}))
