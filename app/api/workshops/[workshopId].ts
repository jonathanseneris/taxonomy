import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withPost } from "@/lib/api-middlewares/with-post"
import { workshopSchema } from "@/lib/validations/workshop"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const em = await getEM()

      return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      const em = await getEM()

      return res.end()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
    }
  }
}

export default withMethods(["DELETE", "PATCH"], withPost(handler))
