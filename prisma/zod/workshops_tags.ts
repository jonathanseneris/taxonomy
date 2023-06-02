import * as z from "zod"
import * as imports from "../null"
import { Completetags, RelatedtagsModel, Completeworkshops, RelatedworkshopsModel } from "./index"

export const workshops_tagsModel = z.object({
  workshops_id: z.string(),
  tags_name: z.string(),
})

export interface Completeworkshops_tags extends z.infer<typeof workshops_tagsModel> {
  tags: Completetags
  workshops: Completeworkshops
}

/**
 * Relatedworkshops_tagsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedworkshops_tagsModel: z.ZodSchema<Completeworkshops_tags> = z.lazy(() => workshops_tagsModel.extend({
  tags: RelatedtagsModel,
  workshops: RelatedworkshopsModel,
}))
