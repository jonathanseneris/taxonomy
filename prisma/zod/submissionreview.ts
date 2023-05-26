import * as z from "zod"
import * as imports from "../null"
import { CompleteSubmission, RelatedSubmissionModel, CompleteUser, RelatedUserModel, CompleteWorkshop, RelatedWorkshopModel } from "./index"

export const SubmissionReviewModel = z.object({
  id: z.number().int(),
  date: z.date(),
  lastUpdate: z.date(),
  submissionId: z.string(),
  userId: z.string(),
  workshopId: z.string(),
})

export interface CompleteSubmissionReview extends z.infer<typeof SubmissionReviewModel> {
  submission: CompleteSubmission
  user: CompleteUser
  workshop: CompleteWorkshop
}

/**
 * RelatedSubmissionReviewModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubmissionReviewModel: z.ZodSchema<CompleteSubmissionReview> = z.lazy(() => SubmissionReviewModel.extend({
  submission: RelatedSubmissionModel,
  user: RelatedUserModel,
  workshop: RelatedWorkshopModel,
}))
