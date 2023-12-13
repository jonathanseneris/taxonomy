import { Workshop } from "@/entities"
import getEM from "@/orm/getEM"
import withORM from "@/orm/withORM"
import { isValid } from "date-fns"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { RequiresProPlanError } from "@/lib/exceptions"

const postRoute = async (req: Request) => {
  console.log(36, "go")
  const session = await getServerSession(authOptions)
  console.log("req.method", req.method)
  if (!session) {
    return new Response(null, { status: 403 })
  }

  try {
    const em = await getEM()

    const body = await req.json()

    console.log("body", body)

    const data = {
      ...body,
      createdBy: session.user.id,
      createdAt: new Date(),
      open: true,
      archived: false,
    }
    if (!data.paid) {
      data.price = null
    }
    console.log("new workshop:", data)
    console.log("isValid??", isValid(data.startDate))
    console.log("isValid??", isValid(data.createdAt))

    const workshop = await em.create(Workshop, data)
    await em.persistAndFlush(workshop)

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

export const POST = withORM(postRoute)
