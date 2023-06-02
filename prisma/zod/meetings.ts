import * as z from "zod"
import * as imports from "../null"
import { Completeworkshops, RelatedworkshopsModel, Completemeetings_attendees, Relatedmeetings_attendeesModel, Completemeetings_invitees, Relatedmeetings_inviteesModel, Completesubmissions, RelatedsubmissionsModel } from "./index"

export const meetingsModel = z.object({
  id: z.number().int(),
  workshop_id: z.string(),
  start_time: z.date(),
})

export interface Completemeetings extends z.infer<typeof meetingsModel> {
  workshops: Completeworkshops
  meetings_attendees: Completemeetings_attendees[]
  meetings_invitees: Completemeetings_invitees[]
  submissions: Completesubmissions[]
}

/**
 * RelatedmeetingsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedmeetingsModel: z.ZodSchema<Completemeetings> = z.lazy(() => meetingsModel.extend({
  workshops: RelatedworkshopsModel,
  meetings_attendees: Relatedmeetings_attendeesModel.array(),
  meetings_invitees: Relatedmeetings_inviteesModel.array(),
  submissions: RelatedsubmissionsModel.array(),
}))
