import { EntityManager, MikroORM, RequestContext } from "@mikro-orm/core"

const getEM = async (): Promise<EntityManager> => {
  const em = await RequestContext.getEntityManager()
  if (!em) {
    throw new Error(
      "Entity manager not found. Are you in a 'withORM'-wrapped Context?"
    )
  }
  return em
}

// export default withORM(getEM)
export default getEM
