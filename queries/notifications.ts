import { cache } from "react"
import { User } from "@/entities"
import getEM from "@/orm/getEM"

export const getNotificationsForUser = cache(async (userId: User["id"]) => {
  const em = await getEM()
  return []
})
