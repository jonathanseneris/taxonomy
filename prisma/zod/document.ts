import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, CompleteDocumentVersion, RelatedDocumentVersionModel } from "./index"

export const DocumentModel = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  userId: z.string(),
})

export interface CompleteDocument extends z.infer<typeof DocumentModel> {
  user: CompleteUser
  DocumentVersion: CompleteDocumentVersion[]
}

/**
 * RelatedDocumentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDocumentModel: z.ZodSchema<CompleteDocument> = z.lazy(() => DocumentModel.extend({
  user: RelatedUserModel,
  DocumentVersion: RelatedDocumentVersionModel.array(),
}))
