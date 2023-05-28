import { NextApiRequest, NextApiResponse } from "next"
import { WorkshopModel } from "@/prisma/zod/workshop"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  if (req.method === "GET") {
    try {
      const workshops = await db.workshop.findMany({
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
        },
        where: {
          authorId: user.id,
        },
      })

      return res.json(workshops)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
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

      console.log("req.body", req.body)
      console.log("session", session)
      const newWorkshop = {
        ...req.body,
        userId: session.user.id,
        open: true,
        archived: false,
      }
      console.log("newWorkshop", newWorkshop)
      const data = WorkshopModel.parse(newWorkshop)
      console.log("data", data)
      const workshop = await db.workshop.create({
        data,
        select: {
          id: true,
        },
      })

      return res.json(workshop)
    } catch (error) {
      console.error(error)
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresProPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }
}

export default withMethods(["GET", "POST"], handler)
