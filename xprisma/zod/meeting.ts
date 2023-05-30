import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, CompleteSubmission, RelatedSubmissionModel, CompleteWorkshop, RelatedWorkshopModel } from "./index"

export const MeetingModel = z.object({
  id: z.number().int(),
  startTime: z.date(),
  workshopId: z.string(),
})

export interface CompleteMeeting extends z.infer<typeof MeetingModel> {
  meetingAttendees: CompleteUser[]
  submissions: CompleteSubmission[]
  Workshop: CompleteWorkshop
}

/**
 * RelatedMeetingModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMeetingModel: z.ZodSchema<CompleteMeeting> = z.lazy(() => MeetingModel.extend({
  meetingAttendees: RelatedUserModel.array(),
  submissions: RelatedSubmissionModel.array(),
  Workshop: RelatedWorkshopModel,
}))
