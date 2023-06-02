import * as z from "zod"
import * as imports from "../null"
import { Completesubmission_reviews, Relatedsubmission_reviewsModel, Completesubmission_slots, Relatedsubmission_slotsModel, CompleteUser, RelatedUserModel, Completemeetings, RelatedmeetingsModel, Completeworkshops, RelatedworkshopsModel } from "./index"

export const submissionsModel = z.object({
  id: z.string(),
  title: z.string(),
  author_id: z.string(),
  workshop_id: z.string(),
  submission_due_date: z.date(),
  submission_date: z.date(),
  meeting_id: z.number().int(),
  password: z.string().nullish(),
  content: z.string(),
})

export interface Completesubmissions extends z.infer<typeof submissionsModel> {
  submission_reviews: Completesubmission_reviews[]
  submission_slots?: Completesubmission_slots | null
  users: CompleteUser
  meetings: Completemeetings
  workshops: Completeworkshops
}

/**
 * RelatedsubmissionsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedsubmissionsModel: z.ZodSchema<Completesubmissions> = z.lazy(() => submissionsModel.extend({
  submission_reviews: Relatedsubmission_reviewsModel.array(),
  submission_slots: Relatedsubmission_slotsModel.nullish(),
  users: RelatedUserModel,
  meetings: RelatedmeetingsModel,
  workshops: RelatedworkshopsModel,
}))
