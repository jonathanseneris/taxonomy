import { NextApiRequest } from "next"
import withORM from "@/orm/withORM"
import { EntityManager, RequestContext } from "@mikro-orm/core"
import type { PostgreSqlDriver } from "@mikro-orm/postgresql"

// or any other driver package

import getLogger from "./getLogger"

const getEM = async (): Promise<EntityManager> => {
  const em = RequestContext.getEntityManager()
  if (!em) {
    throw new Error(
      "Entity manager not found. Are you in a 'withORM'-wrapped Context?"
    )
  }
  return em
}

export default withORM(getEM)
