import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, Completesubmissions, RelatedsubmissionsModel, Completeworkshops, RelatedworkshopsModel } from "./index"

export const submission_reviewsModel = z.object({
  id: z.number().int(),
  submission_id: z.string(),
  reviewer_id: z.string(),
  workshop_id: z.string(),
  date: z.date(),
  last_update: z.date(),
  submitter_id: z.string(),
})

export interface Completesubmission_reviews extends z.infer<typeof submission_reviewsModel> {
  users_submission_reviews_reviewer_idTousers: CompleteUser
  submissions: Completesubmissions
  users_submission_reviews_submitter_idTousers: CompleteUser
  workshops: Completeworkshops
}

/**
 * Relatedsubmission_reviewsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedsubmission_reviewsModel: z.ZodSchema<Completesubmission_reviews> = z.lazy(() => submission_reviewsModel.extend({
  users_submission_reviews_reviewer_idTousers: RelatedUserModel,
  submissions: RelatedsubmissionsModel,
  users_submission_reviews_submitter_idTousers: RelatedUserModel,
  workshops: RelatedworkshopsModel,
}))
