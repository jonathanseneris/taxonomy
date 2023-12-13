// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { User } from "@/entities"
import getEM from "@/orm/getEM"

import { UserSubscriptionPlan } from "types"
import { freePlan, proPlan } from "@/config/subscriptions"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const em = await getEM()
  console.log("userId", userId)
  const user = await em.findOne(User, userId)

  if (!user) {
    throw new Error("User not found")
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    // ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}
