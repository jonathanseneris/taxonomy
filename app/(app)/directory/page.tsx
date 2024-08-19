import { redirect } from "next/navigation"
import withORM from "@/orm/withORM"
import { getOpenUsers } from "@/queries"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserListing } from "@/components/user-listing"
import { WorkCreateButton } from "@/components/work-create-button"
import { Room } from "@/app/(app)/directory/Room"

export const metadata = {
  title: "Dashboard",
}

async function DirectoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const workshoppers = await getOpenUsers(user.id)
  console.log("workshoppers", workshoppers)
  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Hi, ${user.name}!`}
        text="Find your audience."
      />

      <Room>
        <div>
          {workshoppers?.length ? (
            <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
              {workshoppers.map((workshopper) => (
                <UserListing key={workshopper.id} user={workshopper} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>
                No active workshoppers
              </EmptyPlaceholder.Title>
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
      </Room>
    </DashboardShell>
  )
}

export default withORM(DirectoryPage)
