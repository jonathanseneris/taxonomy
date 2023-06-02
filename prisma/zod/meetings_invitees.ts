import * as z from "zod"
import * as imports from "../null"
import { Completemeetings, RelatedmeetingsModel, CompleteUser, RelatedUserModel } from "./index"

export const meetings_inviteesModel = z.object({
  meetings_id: z.number().int(),
  users_id: z.string(),
})

export interface Completemeetings_invitees extends z.infer<typeof meetings_inviteesModel> {
  meetings: Completemeetings
  users: CompleteUser
}

/**
 * Relatedmeetings_inviteesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedmeetings_inviteesModel: z.ZodSchema<Completemeetings_invitees> = z.lazy(() => meetings_inviteesModel.extend({
  meetings: RelatedmeetingsModel,
  users: RelatedUserModel,
}))
