import { cache } from "react"
import { pick } from "next/dist/lib/pick"
import { User } from "@/entities"
import getEM from "@/orm/getEM"

export const getOpenUsers = cache(async (self: number) => {
  const em = await getEM()
  const users = await em.find(User, {
    isAvailable: true,
    isSetUp: true,
    id: { $ne: self },
  })
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    bio: user.bio,
  }))
})

export const getUser = async (id: string) => {
  const em = await getEM()
  const user = await em.findOneOrFail(
    User,
    {
      id,
    },
    { populate: ["tags", "works"] },
  )

  return {
    id: user.id,
    name: user.name,
    location: user.location,
    isAvailable: user.isAvailable,
    image: user.image,
    bio: user.bio,
    workingOn: user.workingOn,
    lookingFor: user.lookingFor,
    tags: user.tags.map((t) =>
      pick(t, ["id", "name", "displayName", "category"]),
    ),
    works: user.works.map((t) => pick(t, ["id", "name"])),
  }
}
