import { redirect } from "next/navigation"
import withORM from "@/orm/withORM"
import { getOpenWorkshops } from "@/queries"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { WorkshopCreateButton } from "@/components/workshop-create-button"
import { WorkshopListing } from "@/components/workshop-listing"

export const metadata = {
  title: "Dashboard",
}

async function DirectoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const workshops = await getOpenWorkshops()
  console.log("workshops", workshops)
  return (
    <DashboardShell>
      <DashboardHeader heading="Directory" text="Find a workshop.">
        <WorkshopCreateButton />
      </DashboardHeader>
      <div>
        {workshops?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {workshops.map((workshop) => (
              <WorkshopListing
                key={workshop.id}
                workshop={workshop}
                user={user}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No active workshops</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Create the first!
            </EmptyPlaceholder.Description>
            <WorkshopCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900"
              )}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}

export default withORM(DirectoryPage)
