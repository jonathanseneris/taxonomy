import { headers } from "next/headers"
import { Users } from "@/entities"
import getEM from "@/orm/getEM"
import Stripe from "stripe"

import { env } from "@/env.mjs"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const em = await getEM()

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    const user = await em.findOne(Users, session?.metadata?.userId)
    if (!user) {
      return new Response(null, { status: 500 })
    }
    user.stripeSubscriptionId = subscription.id
    user.stripeCustomerId = subscription.customer as string
    user.stripePriceId = subscription.items.data[0].price.id
    user.stripeCurrentPeriodEnd = new Date(
      subscription.current_period_end * 1000
    )
    await em.flush()
  }
  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    const user = await em.findOne(Users, {
      stripeSubscriptionId: subscription.id,
    })
    // Update the price id and set the new period end.
    if (!user) {
      return new Response(null, { status: 500 })
    }
    user.stripePriceId = subscription.items.data[0].price.id
    user.stripeCurrentPeriodEnd = new Date(
      subscription.current_period_end * 1000
    )
  }

  return new Response(null, { status: 200 })
}
