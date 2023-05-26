import { DashboardHeader } from "@/components/header"
import { WorkshopCreateButton } from "@/components/workshop-create-button"
import { WorkshopListing } from "@/components/workshop-listing"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <WorkshopCreateButton />
      </DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <WorkshopListing.Skeleton />
        <WorkshopListing.Skeleton />
        <WorkshopListing.Skeleton />
        <WorkshopListing.Skeleton />
        <WorkshopListing.Skeleton />
      </div>
    </DashboardShell>
  )
}
