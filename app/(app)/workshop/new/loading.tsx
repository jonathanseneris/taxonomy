import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="New Workshop" text="Create a new workshop." />
      <div className="grid gap-10">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
