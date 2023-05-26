import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Card } from "@/components/ui/card";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="New Workshop" text="Create a new workshop." />
      <div className="grid gap-10">
        <Card.Skeleton />
        <Card.Skeleton />
      </div>
    </DashboardShell>
  );
}
