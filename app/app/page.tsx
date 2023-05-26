import { cache } from "react";
import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { WorkshopListing } from "@/components/workshop-listing";
import { DashboardShell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { WorkshopCreateButton } from "@/components/workshop-create-button";

export const metadata = {
  title: "Dashboard",
};

const getPostsForUser = cache(async (userId: User["id"]) => {
  return await db.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const posts = []; //await getPostsForUser(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Your workshops at a glance.">
        <WorkshopCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {posts.map((post) => (
              <WorkshopListing key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No workshops</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any workshops yet. Join or create one.
            </EmptyPlaceholder.Description>
            <Link
              href="/app/directory"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900 m-2"
              )}
            >
              <Icons.search className="mr-2 h-4 w-4" />
              Find a workshop
            </Link>
            <WorkshopCreateButton
              className={cn(buttonVariants({ variant: "default" }))}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
