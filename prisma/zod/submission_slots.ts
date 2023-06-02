import * as z from "zod"
import * as imports from "../null"
import { Completesubmissions, RelatedsubmissionsModel, CompleteUser, RelatedUserModel, Completeworkshops, RelatedworkshopsModel } from "./index"

export const submission_slotsModel = z.object({
  id: z.number().int(),
  workshop_id: z.string(),
  due_date: z.date(),
  workshop_date: z.date(),
  submitter_id: z.string(),
  submission_id: z.string(),
  created_at: z.date(),
  last_modified_at: z.date(),
})

export interface Completesubmission_slots extends z.infer<typeof submission_slotsModel> {
  submissions: Completesubmissions
  users: CompleteUser
  workshops: Completeworkshops
}

/**
 * Relatedsubmission_slotsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedsubmission_slotsModel: z.ZodSchema<Completesubmission_slots> = z.lazy(() => submission_slotsModel.extend({
  submissions: RelatedsubmissionsModel,
  users: RelatedUserModel,
  workshops: RelatedworkshopsModel,
}))
