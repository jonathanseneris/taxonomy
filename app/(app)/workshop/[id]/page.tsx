import * as React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { User, Workshop } from "@prisma/client"
import { format } from "date-fns"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

async function getWorkshop(workshopId: Workshop["id"], userId: User["id"]) {
  console.log("workshopId", workshopId)
  return await db.workshop.findFirst({
    where: {
      id: workshopId, // authorId: userId,
    },
    include: {
      createdBy: true,
    },
  })
}

interface WorkshopPageProps {
  params: { id: string }
}

export default async function EditorPage({ params }: WorkshopPageProps) {
  const isSaving = false
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const workshop = await getWorkshop(params.id, user.id)
  if (!workshop) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={workshop.name}
        text={workshop.createdBy?.name}
      />
      <div className="flex w-full items-start">
        {["nonfiction", "essay", "memoir"].map((tag) => (
          <div className="mx-1 my-0">
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          </div>
        ))}
      </div>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">
              {workshop.active ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {format(workshop.startDate, "MMMM d, yyyy")}
              </h2>
              <p className="text-muted-foreground">{workshop.description}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                {workshop.paid ? `$${workshop.price}` : "Free"}
              </h2>
              <h4 className="mt-2 text-xl font-bold tracking-tight">
                Starts {format(workshop.startDate, "MMMM d, yyyy")}
              </h4>
            </div>
            <div className="flex items-center space-x-2">{/*<UserNav />*/}</div>
          </div>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </DashboardShell>
  )
}
