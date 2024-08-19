import { Application, Workshop } from "@/entities"
import getEM from "@/orm/getEM"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

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
    const em = await getEM()
    const application = await em.findOneOrFail(Application, applicationId, {
      populate: ["workshop"],
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
      application.statement = body.statement
      application.about = body.about
      application.sample = body.sample
      if (application.status === "Draft") {
        application.status = body.status
        application.statusChangedOn = new Date()
        if (body.status === "Submitted") {
          application.submittedOn = new Date()
        }
      }
    }

    if (application.workshop.userId === session.user.id) {
      application.status = body.status
      application.statusChangedOn = new Date()
    }

    await em.flush()

    if (
      application.workshop?.userId === session.user.id &&
      status === "Accepted"
    ) {
      const workshop = await em.findOneOrFail(Workshop, workshopId)
      workshop.participants.add(application.userId)
    }
    await em.flush()

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
