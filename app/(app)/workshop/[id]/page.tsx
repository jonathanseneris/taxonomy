import * as React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import withORM from "@/orm/withORM"
import { getApplication, getApplications, getWorkshop } from "@/queries"
import { format, isAfter } from "date-fns"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

interface WorkshopPageProps {
  params: { id: string }
}

async function WorkshopPage({ params }: WorkshopPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const workshop = await getWorkshop(params.id, user.id)
  if (!workshop) {
    notFound()
  }

  const isMyWorkshop = workshop.createdBy?.id === user.id

  const application = isMyWorkshop
    ? null
    : await getApplication(params.id, user?.id)

  const applications = await getApplications(params.id)
  console.log("appss", applications)
  const openApplications = applications?.filter((a) => a.status === "Submitted")
  const filled = applications?.filter((a) => a.status === "Accepted")

  const applicationStatus = application?.status

  const didStart = isAfter(new Date(), new Date(workshop.startDate))
  console.log("workshop", workshop)
  return (
    <DashboardShell>
      <DashboardHeader
        heading={workshop.name}
        text={workshop.createdBy?.name || ""}
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
            {/*<p className="text-sm text-muted-foreground">*/}
            {/*  {workshop.active ? "Published" : "Draft"}*/}
            {/*</p>*/}
          </div>

          {isMyWorkshop ? (
            openApplications?.length ? (
              <Link href={`/workshop/${params.id}/application`}>
                <span className="font-bold text-yellow-300 hover:underline">
                  {openApplications.length}
                </span>{" "}
                open application{openApplications.length > 1 ? "s" : ""}
              </Link>
            ) : (
              "No open applications"
            )
          ) : applicationStatus ? (
            <Link href={`/workshop/${params.id}/application`}>
              Application Status:{" "}
              <span className="font-bold text-yellow-300 hover:underline">
                {applicationStatus}
              </span>
            </Link>
          ) : (
            <Link href={`/workshop/${params.id}/application`}>
              <button className={cn(buttonVariants())}>Apply</button>
            </Link>
          )}
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Description</h2>
              <p className="mb-4 text-muted-foreground">
                {workshop.description}
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                Led by{" "}
                <span className="text-yellow-300">
                  {workshop.createdBy.name}
                </span>
              </h2>
              <p className="mb-4 text-muted-foreground">
                {workshop.createdBy.bio}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                {workshop.paid ? `$${workshop.price}` : "Free"}
              </h2>
              <h4 className="mt-2 text-xl font-bold tracking-tight">
                {didStart ? "Started" : "Starts"}{" "}
                {format(workshop.startDate, "MMMM d, yyyy")}
              </h4>
              <h4 className="mt-2 text-xl font-bold tracking-tight">
                {workshop.targetSize} slots /{" "}
                <span
                  className={
                    filled?.length >= workshop.targetSize
                      ? "text-red-300"
                      : "text-green-300"
                  }
                >
                  {filled?.length || 0}
                </span>{" "}
                filled
              </h4>
            </div>
            <div className="flex items-center space-x-2">{/*<UserNav />*/}</div>
          </div>
        </div>
        {/*<div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">*/}
        {/*  <div id="editor" className="min-h-[500px]" />*/}
        {/*  <p className="text-sm text-gray-500">*/}
        {/*    Use{" "}*/}
        {/*    <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">*/}
        {/*      Tab*/}
        {/*    </kbd>{" "}*/}
        {/*    to open the command menu.*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </DashboardShell>
  )
}

export default withORM(WorkshopPage)
