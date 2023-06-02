import * as z from "zod"
import * as imports from "../null"
import { Completemeetings, RelatedmeetingsModel, CompleteUser, RelatedUserModel } from "./index"

export const meetings_attendeesModel = z.object({
  meetings_id: z.number().int(),
  users_id: z.string(),
})

export interface Completemeetings_attendees extends z.infer<typeof meetings_attendeesModel> {
  meetings: Completemeetings
  users: CompleteUser
}

/**
 * Relatedmeetings_attendeesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedmeetings_attendeesModel: z.ZodSchema<Completemeetings_attendees> = z.lazy(() => meetings_attendeesModel.extend({
  meetings: RelatedmeetingsModel,
  users: RelatedUserModel,
}))
