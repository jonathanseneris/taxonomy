import * as z from "zod"
import * as imports from "../null"
import { Decimal } from "decimal.js"
import { Completeapplications, RelatedapplicationsModel, Completemeetings, RelatedmeetingsModel, Completesubmission_reviews, Relatedsubmission_reviewsModel, Completesubmission_slots, Relatedsubmission_slotsModel, Completesubmissions, RelatedsubmissionsModel, Completeusers_workshops, Relatedusers_workshopsModel, CompleteUser, RelatedUserModel, Completeworkshops_tags, Relatedworkshops_tagsModel, Completeworkshops_users, Relatedworkshops_usersModel } from "./index"

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

export const workshopsModel = z.object({
  id: z.string(),
  target_size: z.number().int(),
  start_date: z.date(),
  paid: z.boolean(),
  price: z.number(),
  submission_length: z.string(),
  name: z.string(),
  description: z.string(),
  open: z.boolean(),
  archived: z.boolean(),
  leader_id: z.string(),
  leader_bio: z.string(),
})

export interface Completeworkshops extends z.infer<typeof workshopsModel> {
  applications: Completeapplications[]
  meetings: Completemeetings[]
  submission_reviews: Completesubmission_reviews[]
  submission_slots: Completesubmission_slots[]
  submissions: Completesubmissions[]
  users_workshops: Completeusers_workshops[]
  users: CompleteUser
  workshops_tags: Completeworkshops_tags[]
  workshops_users: Completeworkshops_users[]
}

/**
 * RelatedworkshopsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedworkshopsModel: z.ZodSchema<Completeworkshops> = z.lazy(() => workshopsModel.extend({
  applications: RelatedapplicationsModel.array(),
  meetings: RelatedmeetingsModel.array(),
  submission_reviews: Relatedsubmission_reviewsModel.array(),
  submission_slots: Relatedsubmission_slotsModel.array(),
  submissions: RelatedsubmissionsModel.array(),
  users_workshops: Relatedusers_workshopsModel.array(),
  users: RelatedUserModel,
  workshops_tags: Relatedworkshops_tagsModel.array(),
  workshops_users: Relatedworkshops_usersModel.array(),
}))
