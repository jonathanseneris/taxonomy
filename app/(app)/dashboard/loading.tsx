import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserListing } from "@/components/user-listing"
import { WorkCreateButton } from "@/components/work-create-button"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="">
        <WorkCreateButton />
      </DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <UserListing.Skeleton />
        <UserListing.Skeleton />
        <UserListing.Skeleton />
        <UserListing.Skeleton />
        <UserListing.Skeleton />
      </div>
    </DashboardShell>
  )
}
