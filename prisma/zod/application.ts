import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, CompleteWorkshop, RelatedWorkshopModel } from "./index"

export const ApplicationModel = z.object({
  id: z.string(),
  submittedOn: z.date(),
  viewedOn: z.date(),
  statusChangedOn: z.date(),
  status: z.string(),
  statement: z.string(),
  about: z.string(),
  sample: z.string(),
  userId: z.string(),
  workshopId: z.string(),
})

export interface CompleteApplication extends z.infer<typeof ApplicationModel> {
  user: CompleteUser
  workshop: CompleteWorkshop
}

/**
 * RelatedApplicationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedApplicationModel: z.ZodSchema<CompleteApplication> = z.lazy(() => ApplicationModel.extend({
  user: RelatedUserModel,
  workshop: RelatedWorkshopModel,
}))
