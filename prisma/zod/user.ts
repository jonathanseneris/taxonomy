import * as z from "zod"
import * as imports from "../null"
import { CompleteSession, RelatedSessionModel, CompleteAccount, RelatedAccountModel, CompleteApplication, RelatedApplicationModel, CompleteSubmissionSlot, RelatedSubmissionSlotModel, CompleteSubmission, RelatedSubmissionModel, CompleteWorkshop, RelatedWorkshopModel, CompleteMeeting, RelatedMeetingModel, CompleteSubmissionReview, RelatedSubmissionReviewModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  image: z.string().nullish(),
  stripeCustomerId: z.string().nullish(),
  stripeSubscriptionId: z.string().nullish(),
  stripePriceId: z.string().nullish(),
  stripeCurrentPeriodEnd: z.date().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  bio: z.string(),
  name: z.string().nullish(),
  firstName: z.string().nullish(),
  middleName: z.string().nullish(),
  lastName: z.string().nullish(),
  active: z.boolean(),
  confirmed: z.boolean(),
  location: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastModifiedAt: z.date(),
  isLockedOut: z.boolean(),
  meetingId: z.number().int().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  sessions: CompleteSession[]
  accounts: CompleteAccount[]
  applications: CompleteApplication[]
  submissionSlots: CompleteSubmissionSlot[]
  submissions: CompleteSubmission[]
  workshops: CompleteWorkshop[]
  Meeting?: CompleteMeeting | null
  SubmissionReview: CompleteSubmissionReview[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  sessions: RelatedSessionModel.array(),
  accounts: RelatedAccountModel.array(),
  applications: RelatedApplicationModel.array(),
  submissionSlots: RelatedSubmissionSlotModel.array(),
  submissions: RelatedSubmissionModel.array(),
  workshops: RelatedWorkshopModel.array(),
  Meeting: RelatedMeetingModel.nullish(),
  SubmissionReview: RelatedSubmissionReviewModel.array(),
}))
