import { isValid } from "date-fns"
import { Decimal } from "decimal.js"
import * as z from "zod"

import * as imports from "../null"
import {
  CompleteApplication,
  CompleteMeeting,
  CompleteSubmission,
  CompleteSubmissionReview,
  CompleteSubmissionSlot,
  CompleteUser,
  RelatedApplicationModel,
  RelatedMeetingModel,
  RelatedSubmissionModel,
  RelatedSubmissionReviewModel,
  RelatedSubmissionSlotModel,
  RelatedUserModel,
} from "./index"

const dateString = z.union([z.string(), z.date()])

// Helper schema for Decimal fields
z.instanceof(Decimal)
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
  id: z.string().optional(),
  targetSize: z.number().int(),
  startDate: dateString.refine((x) => isValid(new Date(x)), {
    message: "Date is invalid",
  }),
  paid: z.boolean(),
  price: z.number().nullish(),
  submissionLength: z.string(),
  name: z.string(),
  description: z.string(),
  open: z.boolean(),
  archived: z.boolean(),
  userId: z.string(),
  createdAt: dateString.refine((x) => isValid(new Date(x)), {
    message: "Date is invalid",
  }),
})

export interface CompleteWorkshop extends z.infer<typeof WorkshopModel> {
  applications: CompleteApplication[]
  meetings: CompleteMeeting[]
  submissionSlots: CompleteSubmissionSlot[]
  submissions: CompleteSubmission[]
  SubmissionReview: CompleteSubmissionReview[]
  createdBy: CompleteUser
}

/**
 * RelatedWorkshopModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWorkshopModel: z.ZodSchema<CompleteWorkshop> = z.lazy(() =>
  WorkshopModel.extend({
    applications: RelatedApplicationModel.array(),
    meetings: RelatedMeetingModel.array(),
    submissionSlots: RelatedSubmissionSlotModel.array(),
    submissions: RelatedSubmissionModel.array(),
    SubmissionReview: RelatedSubmissionReviewModel.array(),
    createdBy: RelatedUserModel,
  })
)
