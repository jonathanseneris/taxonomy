import { cache } from "react"
import { redirect } from "next/navigation"
import { Workshops } from "@/entities"

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

const getWorkshops = cache(async () => {
  const em = await getEM()
  return await em.find(
    Workshops,
    {
      open: true,
    },
    {
      attributes: ["id", "name", "createdBy", "createdAt", "startDate"],
      orderBy: {
        startDate: "desc",
      },
    }
  )
})

export default async function DirectoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const workshops = await getWorkshops()
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
              <WorkshopListing key={workshop.id} workshop={workshop} />
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
