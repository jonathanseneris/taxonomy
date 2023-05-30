import * as z from "zod"
import * as imports from "../null"
import { CompleteSubmission, RelatedSubmissionModel, CompleteUser, RelatedUserModel, CompleteWorkshop, RelatedWorkshopModel } from "./index"

export const SubmissionSlotModel = z.object({
  id: z.number().int(),
  workshopId: z.string(),
  dueDate: z.date(),
  workshopDate: z.date(),
  createdAt: z.date(),
  lastModifiedAt: z.date(),
  submissionId: z.string().nullish(),
  userId: z.string().nullish(),
})

export interface CompleteSubmissionSlot extends z.infer<typeof SubmissionSlotModel> {
  Submission?: CompleteSubmission | null
  User?: CompleteUser | null
  Workshop: CompleteWorkshop
}

/**
 * RelatedSubmissionSlotModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubmissionSlotModel: z.ZodSchema<CompleteSubmissionSlot> = z.lazy(() => SubmissionSlotModel.extend({
  Submission: RelatedSubmissionModel.nullish(),
  User: RelatedUserModel.nullish(),
  Workshop: RelatedWorkshopModel,
}))
