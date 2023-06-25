import { WorkshopModel } from "@/prisma/zod/workshop"
import { isValid } from "date-fns"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"

export async function GET() {
  console.log(10, "go")
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response(null, { status: 403 })
  }

  // const { user } = session

  try {
    const workshops = await db.workshop.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
      }, // where: {
      //   createdBy: user.id,
      // },
    })

    return new Response(JSON.stringify(workshops), { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  console.log(36, "go")
  const session = await getServerSession(authOptions)
  console.log("req.method", req.method)
  if (!session) {
    return new Response(null, { status: 403 })
  }

  try {
    // const subscriptionPlan = await getUserSubscriptionPlan(user.id);
    //
    // // If user is on a free plan.
    // // Check if user has reached limit of 3 workshops.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await db.workshop.count({
    //     where: {
    //       authorId: user.id,
    //     },
    //   });
    //
    //   if (count >= 3) {
    //     throw new RequiresProPlanError();
    //   }
    // }

    const body = await req.json()

    console.log("body", body)
    const newWorkshop = {
      ...body,
      userId: session.user.id,
      createdAt: new Date(),
      open: true,
      archived: false,
    }
    console.log("new workshop:", newWorkshop)
    console.log("isValid?", isValid(newWorkshop.startDate))
    console.log("isValid?", isValid(newWorkshop.createdAt))
    const data = WorkshopModel.parse(newWorkshop)
    console.log("passed data", data)
    const workshop = await db.workshop.create({
      data,
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(workshop), { status: 200 })
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
