import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { WorkCreateButton } from "@/components/work-create-button"
import { UserListing } from "@/components/user-listing"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Directory" text="Find a workshop.">
        <WorkCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <UserListing.Skeleton />
        <UserListing.Skeleton />
        <UserListing.Skeleton />
        <UserListing.Skeleton />
        <UserListing.Skeleton />
      </div>
    </DashboardShell>
  )
}
