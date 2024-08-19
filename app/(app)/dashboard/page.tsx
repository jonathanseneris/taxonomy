import * as React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { User } from "@/entities"
import withORM from "@/orm/withORM"
import { getNotificationsForUser, getWorkshopsForUser } from "@/queries"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { UserListing } from "@/components/user-listing"
import { WorkCreateButton } from "@/components/work-create-button"

export const metadata = {
  title: "Dashboard",
}

export const dynamic = "force-dynamic"

async function DashboardPage() {
  console.log("go--")
  const user: User = await getCurrentUser()
  console.log("user", user)
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  console.log("user", user)
  const notifications = await getNotificationsForUser(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Your workshops at a glance.">
        <WorkCreateButton />
      </DashboardHeader>
      <div>
        {notifications.length ? (
          <div>
            <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
              {leading.map((workshop) => (
                <UserListing key={workshop.id} workshop={workshop} />
              ))}
            </div>
            <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
              {participating.map((workshop) => (
                <UserListing key={workshop.id} workshop={workshop} />
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
                "text-slate-900 m-2",
              )}
            >
              <Icons.search className="mr-2 h-4 w-4" />
              Find workshoppers
            </Link>
            <WorkCreateButton
              className={cn(buttonVariants({ variant: "default" }))}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}

export default withORM(DashboardPage)
