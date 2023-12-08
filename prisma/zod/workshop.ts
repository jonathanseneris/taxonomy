import * as z from "zod"
import * as imports from "../null"
import { Decimal } from "decimal.js"
import { CompleteApplication, RelatedApplicationModel, CompleteMeeting, RelatedMeetingModel, CompleteSubmissionSlot, RelatedSubmissionSlotModel, CompleteSubmission, RelatedSubmissionModel, CompleteSubmissionReview, RelatedSubmissionReviewModel, CompleteUser, RelatedUserModel, CompleteDocumentVersion, RelatedDocumentVersionModel } from "./index"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const WorkshopModel = z.object({
  id: z.string(),
  targetSize: z.number().int(),
  startDate: z.date(),
  paid: z.boolean(),
  price: z.number().nullish(),
  submissionLength: z.string(),
  name: z.string(),
  description: z.string(),
  open: z.boolean(),
  archived: z.boolean(),
  userId: z.string(),
  createdAt: z.date().nullish(),
})

export interface CompleteWorkshop extends z.infer<typeof WorkshopModel> {
  applications: CompleteApplication[]
  meetings: CompleteMeeting[]
  submissionSlots: CompleteSubmissionSlot[]
  submissions: CompleteSubmission[]
  SubmissionReview: CompleteSubmissionReview[]
  participants: CompleteUser[]
  createdBy: CompleteUser
  DocumentVersion: CompleteDocumentVersion[]
}

/**
 * RelatedWorkshopModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWorkshopModel: z.ZodSchema<CompleteWorkshop> = z.lazy(() => WorkshopModel.extend({
  applications: RelatedApplicationModel.array(),
  meetings: RelatedMeetingModel.array(),
  submissionSlots: RelatedSubmissionSlotModel.array(),
  submissions: RelatedSubmissionModel.array(),
  SubmissionReview: RelatedSubmissionReviewModel.array(),
  participants: RelatedUserModel.array(),
  createdBy: RelatedUserModel,
  DocumentVersion: RelatedDocumentVersionModel.array(),
}))
