import { Application } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    workshopId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    console.log("context", context)
    const { params } = routeContextSchema.parse(context)
    console.log("params", params)
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new Response(null, { status: 403 })
    }

    const { workshopId } = params

    // Get the request body and validate it.
    const body = await req.json()
    console.log("body", body)
    const { status, applicationId } = body

    const application = await db.application.findFirstOrThrow({
      where: {
        id: applicationId,
      },
      include: {
        workshop: true,
      },
    })

    if (
      !application ||
      application.workshopId !== workshopId ||
      (application.userId !== session.user.id &&
        application.workshop.userId !== session.user.id) ||
      (application.userId === session.user.id && application.status !== "Draft")
    ) {
      console.log("-----", application?.workshop.userId, session.user.id)
      return new Response(null, { status: 401 })
    }

    const data: Partial<Application> = {}

    if (application.userId === session.user.id) {
      data.statement = body.statement
      data.about = body.about
      data.sample = body.sample
      if (application.status === "Draft") {
        data.status = body.status
        data.statusChangedOn = new Date()
        if (body.status === "Submitted") {
          data.submittedOn = new Date()
        }
      }
    }

    if (application.workshop.userId === session.user.id) {
      data.status = body.status
      data.statusChangedOn = new Date()
    }
    console.log("updating", applicationId, data)
    await db.application.update({
      where: {
        id: applicationId,
      },
      data,
    })

    if (application.workshop.userId === session.user.id) {
      if (status === "Accepted") {
        console.log("updating", application.userId, {
          participants: {
            connect: {
              id: application.userId,
            },
          },
        })
        await db.workshop.update({
          where: {
            id: workshopId,
          },
          data: {
            participants: {
              connect: {
                id: application.userId,
              },
            },
          },
        })
      }
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
