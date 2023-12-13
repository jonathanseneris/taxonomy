import { cache } from "react"
import { User, Workshop } from "@/entities"
import getEM from "@/orm/getEM"

export const getWorkshop = cache(
  async (workshopId: Workshop["id"], userId: User["id"]) => {
    console.log("workshopId", workshopId)
    const em = await getEM()
    const workshop = await em.findOne(Workshop, workshopId, {
      populate: ["createdBy"],
    })
    return workshop
  }
)

export const getWorkshopsForUser = cache(async (userId: User["id"]) => {
  const em = await getEM()
  const user = await em.findOne(User, userId, {
    populate: ["workshops"],
  })

  console.log("user", user)
  return { participating: user?.workshops || [], leading: user?.Workshop || [] }
})

export const getOpenWorkshops = cache(async () => {
  const em = await getEM()
  return await em.find(Workshop, { open: true }, { populate: ["participants"] })
})
