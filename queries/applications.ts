import { cache } from "react"
import { Application, Workshop } from "@/entities"
import getEM from "@/orm/getEM"

export const getApplication = cache(
  async (workshopId: Workshop["id"], userId: User["id"]) => {
    const em = await getEM()
    const application = await em.findOne(Application, {
      workshopId,
      userId,
    })
    return application
  }
)

export const getOpenApplications = cache(async (workshopId: Workshop["id"]) => {
  const em = await getEM()
  const applications = await em.find(
    Application,
    {
      workshopId,
      status: "Submitted",
    },
    {
      populate: ["user"],
    }
  )
  return applications
  // return await db.application.findMany({
  //   where: {
  //     workshopId,
  //     status: "Submitted",
  //   },
  //   include: {
  //     user: {
  //       select: {
  //         name: true,
  //         firstName: true,
  //         lastName: true,
  //         bio: true,
  //         email: true,
  //         id: true,
  //       },
  //     },
  //   },
  // })
})

export const getApplications = cache(async (workshop: Workshop["id"]) => {
  const em = await getEM()
  const applications = await em.find(
    Application,
    {
      workshop,
      status: {
        $ne: "Draft",
      },
    },
    {
      attributes: ["id", "status"],
    }
  )
  return applications
})
