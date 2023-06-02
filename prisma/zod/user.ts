import * as z from "zod"
import * as imports from "../null"
import { Completeapplications, RelatedapplicationsModel, Completemeetings_attendees, Relatedmeetings_attendeesModel, Completemeetings_invitees, Relatedmeetings_inviteesModel, Completesubmission_reviews, Relatedsubmission_reviewsModel, Completesubmission_slots, Relatedsubmission_slotsModel, Completesubmissions, RelatedsubmissionsModel, Completeusers_logins, Relatedusers_loginsModel, Completeusers_workshops, Relatedusers_workshopsModel, Completeworkshops, RelatedworkshopsModel, Completeworkshops_users, Relatedworkshops_usersModel } from "./index"

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
  name: z.string(),
  active: z.boolean(),
  confirmed: z.boolean(),
  location: z.string(),
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  created_at: z.date(),
  last_modified_at: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  applications: Completeapplications[]
  meetings_attendees: Completemeetings_attendees[]
  meetings_invitees: Completemeetings_invitees[]
  submission_reviews_submission_reviews_reviewer_idTousers: Completesubmission_reviews[]
  submission_reviews_submission_reviews_submitter_idTousers?: Completesubmission_reviews | null
  submission_slots?: Completesubmission_slots | null
  submissions: Completesubmissions[]
  users_logins: Completeusers_logins[]
  users_workshops: Completeusers_workshops[]
  workshops: Completeworkshops[]
  workshops_users: Completeworkshops_users[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  applications: RelatedapplicationsModel.array(),
  meetings_attendees: Relatedmeetings_attendeesModel.array(),
  meetings_invitees: Relatedmeetings_inviteesModel.array(),
  submission_reviews_submission_reviews_reviewer_idTousers: Relatedsubmission_reviewsModel.array(),
  submission_reviews_submission_reviews_submitter_idTousers: Relatedsubmission_reviewsModel.nullish(),
  submission_slots: Relatedsubmission_slotsModel.nullish(),
  submissions: RelatedsubmissionsModel.array(),
  users_logins: Relatedusers_loginsModel.array(),
  users_workshops: Relatedusers_workshopsModel.array(),
  workshops: RelatedworkshopsModel.array(),
  workshops_users: Relatedworkshops_usersModel.array(),
}))
