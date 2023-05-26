import * as z from "zod"
import * as imports from "../null"
import { CompleteSubmissionReview, RelatedSubmissionReviewModel, CompleteMeeting, RelatedMeetingModel, CompleteUser, RelatedUserModel, CompleteWorkshop, RelatedWorkshopModel, CompleteSubmissionSlot, RelatedSubmissionSlotModel } from "./index"

export const SubmissionModel = z.object({
  id: z.string(),
  title: z.string(),
  submissionDueDate: z.date(),
  submissionDate: z.date(),
  password: z.string().nullish(),
  content: z.string(),
  meetingId: z.number().int().nullish(),
  userId: z.string().nullish(),
  workshopId: z.string().nullish(),
})

export interface CompleteSubmission extends z.infer<typeof SubmissionModel> {
  reviews: CompleteSubmissionReview[]
  Meeting?: CompleteMeeting | null
  User?: CompleteUser | null
  Workshop?: CompleteWorkshop | null
  SubmissionSlot: CompleteSubmissionSlot[]
}

/**
 * RelatedSubmissionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubmissionModel: z.ZodSchema<CompleteSubmission> = z.lazy(() => SubmissionModel.extend({
  reviews: RelatedSubmissionReviewModel.array(),
  Meeting: RelatedMeetingModel.nullish(),
  User: RelatedUserModel.nullish(),
  Workshop: RelatedWorkshopModel.nullish(),
  SubmissionSlot: RelatedSubmissionSlotModel.array(),
}))
