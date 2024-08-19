import { redirect } from "next/navigation"
import withORM from "@/orm/withORM"
import { getWorksForUser } from "@/queries"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserListing } from "@/components/user-listing"
import { WorkCreateButton } from "@/components/work-create-button"

export const metadata = {
  title: "Dashboard",
}

async function WorkPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const works = await getWorks(user.id)
  return (
    <DashboardShell>
      <DashboardHeader heading="Directory" text="Find a workshop.">
        <WorkCreateButton />
      </DashboardHeader>
      <div>
        {works?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {works.map((workshop) => (
              <UserListing key={workshop.id} workshop={workshop} user={user} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No active works</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Create the first!
            </EmptyPlaceholder.Description>
            <WorkCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900",
              )}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}

export default withORM(WorkPage)
