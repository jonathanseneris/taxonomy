import { cache } from "react";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { WorkshopListing } from "@/components/workshop-listing";
import { DashboardShell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { WorkshopCreateButton } from "@/components/workshop-create-button";

export const metadata = {
  title: "Dashboard",
};

const getWorkshops = cache(async () => {
  return await db.workshop.findMany({
    where: {
      open: true,
    },
    select: {
      id: true,
      name: true,
      createdBy: true,
      startDate: true,
    },
    orderBy: {
      startDate: "desc",
    },
  });
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const workshops = await getWorkshops();

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
  );
}
