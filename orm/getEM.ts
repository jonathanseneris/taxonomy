import { NextApiRequest } from "next"
import { RequestContext } from "@mikro-orm/core"

import getLogger from "./getLogger"

const getEM = async (req: NextApiRequest) => {
  const em = RequestContext.getEntityManager()
  if (!em) {
    throw new Error(
      "Entity manager not found. Are you in a 'withORM'-wrapped Context?"
    )
  }

  const logger = await getLogger()

  logger.info(
    JSON.stringify({
      userId: req.session?.user?.id,
      lastName: req.session?.user?.lastName,
      method: req.method,
      url: req.url,
      body: req.body,
    })
  )

  return em
}

export default getEM
