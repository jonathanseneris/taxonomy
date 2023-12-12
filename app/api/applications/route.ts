import { Application } from "@/entities"
import { WorkshopModel } from "@/prisma/zod/workshop"
import { isValid } from "date-fns"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"

export async function POST(req: Request) {
  console.log(36, "go")
  const session = await getServerSession(authOptions)
  console.log("req.method", req.method)
  if (!session) {
    return new Response(null, { status: 403 })
  }

  try {
    const body = await req.json()

    console.log("body", body)
    const { workshopId, statement, about, sample, status } = body
    if (!workshopId || !statement || !about || !sample) {
      throw new Error("Missing required field(s)")
    }

    const em = await getEM()

    const existingApplication = await em.findOne(Application, {
      workshopId,
      userId: session?.user?.id,
    })

    if (existingApplication) {
      throw new Error("Existing Application")
    }

    // validate status

    const data = {
      workshop: {
        id: workshopId,
      },
      user: {
        id: session.user.id,
      },
      statement,
      about,
      sample,
      status,
      submittedOn: null,
      viewedOn: null,
      statusChangedOn: null,
    }

    console.log(data)

    const application = await em.create(Application, {
      data,
      select: { id: true },
    })

    await em.persistAndFlush(application)

    // const newWorkshop = {
    //   ...body,
    //   userId: session.user.id,
    //   createdAt: new Date(),
    //   open: true,
    //   archived: false,
    // }
    // if (!newWorkshop.paid) {
    //   newWorkshop.price = null
    // }
    // console.log("new workshop:", newWorkshop)
    // console.log("isValid?", isValid(newWorkshop.startDate))
    // console.log("isValid?", isValid(newWorkshop.createdAt))
    // const data = WorkshopModel.parse(newWorkshop)
    // console.log("passed data", data)
    // const workshop = await db.workshop.create({
    //   data,
    //   select: {
    //     id: true,
    //   },
    // })
    //
    return new Response(JSON.stringify(application), { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response(null, { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
