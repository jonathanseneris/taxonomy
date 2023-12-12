import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import config from "@/mikro-orm.config"
import { MikroORM, RequestContext } from "@mikro-orm/core"

const getORM = async () => {
  if (!global.__MikroORM__) {
    console.log("withOrm", 7)
    global.__MikroORM__ = await MikroORM.init(config)
  }
  return global.__MikroORM__
}

const withORM =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const orm = await getORM()
    return RequestContext.createAsync(orm.em, async () => handler(req, res))
  }

export default withORM
