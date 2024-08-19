import { User } from "@/entities"
import getEM from "@/orm/getEM"
import withORM from "@/orm/withORM"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { userNameSchema } from "@/lib/validations/user"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

const patchRoute = async (
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) => {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    console.log("body", body)
    const payload = userNameSchema.parse(body)
    console.log("payload", payload)
    const em = await getEM()
    const user = await em.findOneOrFail(
      User,
      { id: params.userId },
      {
        fields: [
          "id",
          "name",
          "bio",
          "location",
          "workingOn",
          "lookingFor",
          "isAvailable",
          "updatedAt",
        ],
      },
    )
    console.log("user", user)
    user.name = payload.name
    user.bio = payload.bio
    user.location = payload.location
    user.workingOn = payload.workingOn
    user.lookingFor = payload.lookingFor
    user.isAvailable = payload.isAvailable
    user.updatedAt = new Date()

    await em.flush()

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(error, { status: 500 })
  }
}

export const PATCH = withORM(patchRoute)
