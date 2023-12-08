import * as z from "zod"
import * as imports from "../null"
import { CompleteDocument, RelatedDocumentModel, CompleteUser, RelatedUserModel, CompleteWorkshop, RelatedWorkshopModel } from "./index"

export const DocumentVersionModel = z.object({
  id: z.string(),
  submittedOn: z.date().nullish(),
  viewedOn: z.date().nullish(),
  statusChangedOn: z.date().nullish(),
  body: z.string(),
  documentId: z.string(),
  userId: z.string().nullish(),
  workshopId: z.string().nullish(),
})

export interface CompleteDocumentVersion extends z.infer<typeof DocumentVersionModel> {
  document: CompleteDocument
  User?: CompleteUser | null
  Workshop?: CompleteWorkshop | null
}

/**
 * RelatedDocumentVersionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDocumentVersionModel: z.ZodSchema<CompleteDocumentVersion> = z.lazy(() => DocumentVersionModel.extend({
  document: RelatedDocumentModel,
  User: RelatedUserModel.nullish(),
  Workshop: RelatedWorkshopModel.nullish(),
}))
