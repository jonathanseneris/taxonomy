import * as z from "zod"
import * as imports from "../null"
import { Completeworkshops_tags, Relatedworkshops_tagsModel } from "./index"

export const tagsModel = z.object({
  name: z.string(),
  display_name: z.string(),
  category: z.string(),
})

export interface Completetags extends z.infer<typeof tagsModel> {
  workshops_tags: Completeworkshops_tags[]
}

/**
 * RelatedtagsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedtagsModel: z.ZodSchema<Completetags> = z.lazy(() => tagsModel.extend({
  workshops_tags: Relatedworkshops_tagsModel.array(),
}))
