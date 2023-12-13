import * as React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import withORM from "@/orm/withORM"
import { getWorkshopsForUser } from "@/queries"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { WorkshopCreateButton } from "@/components/workshop-create-button"
import { WorkshopListing } from "@/components/workshop-listing"

export const metadata = {
  title: "Dashboard",
}

export const dynamic = "force-dynamic"

async function DashboardPage() {
  console.log("go--")
  const user = await getCurrentUser()
  console.log("user", user)
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  console.log("user", user)
  const { participating, leading } = await getWorkshopsForUser(user?.id)
  console.log("workshops", participating, leading)
  const hasWorkshops = participating?.length || leading?.length
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Your workshops at a glance.">
        <WorkshopCreateButton />
      </DashboardHeader>
      <div>
        {hasWorkshops ? (
          <div>
            <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
              {leading.map((workshop) => (
                <WorkshopListing key={workshop.id} workshop={workshop} />
              ))}
            </div>
            <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
              {participating.map((workshop) => (
                <WorkshopListing key={workshop.id} workshop={workshop} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No workshops</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any workshops yet. Join or create one.
            </EmptyPlaceholder.Description>
            <Link
              href="/directory"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900 m-2"
              )}
            >
              <Icons.search className="mr-2 h-4 w-4" />
              Find a workshop
            </Link>
            <WorkshopCreateButton
              className={cn(buttonVariants({ variant: "default" }))}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}

export default withORM(DashboardPage)
