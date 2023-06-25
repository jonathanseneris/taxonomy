import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { WorkshopCreateButton } from "@/components/workshop-create-button"
import { WorkshopListing } from "@/components/workshop-listing"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Create and manage workshops.">
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
