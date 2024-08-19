import { Tag } from "@/entities"
import getEM from "@/orm/getEM"
import withORM from "@/orm/withORM"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { RequiresProPlanError } from "@/lib/exceptions"

async function postRoute(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(null, { status: 403 })
  }

  try {
    const body = await req.json()

    const { name, category, displayName } = body
    if (!name) {
      throw new Error("Name required")
    }

    const em = await getEM()

    const tag = em.create(Tag, {
      name,
      category,
      displayName,
    })
    // validate status

    await em.persistAndFlush(tag)

    return new Response(JSON.stringify(tag), { status: 200 })
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
