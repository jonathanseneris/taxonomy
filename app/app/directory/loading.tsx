import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { WorkshopCreateButton } from "@/components/workshop-create-button"
import { WorkshopListing } from "@/components/workshop-listing"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <WorkshopCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <WorkshopListing.Skeleton />
        <WorkshopListing.Skeleton />
        <WorkshopListing.Skeleton />
        <WorkshopListing.Skeleton />
        <WorkshopListing.Skeleton />
      </div>
    </DashboardShell>
  )
}
