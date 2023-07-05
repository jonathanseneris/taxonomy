import * as z from "zod"

export const applicationSchema = z.object({
  about: z.string().min(3),
  statement: z.string().min(3),
  sample: z.string().min(3),
  userId: z.string().optional(),
  workshopId: z.string().optional(),
  status: z.string().optional(),
  submittedOn: z.date().optional().optional(),
  viewedOn: z.date().optional().optional(),
  statusChangedOn: z.date().optional().optional(),
})
