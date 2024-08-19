import * as React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import withORM from "@/orm/withORM"
import { getUser } from "@/queries"
import { format, isAfter } from "date-fns"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

interface UserPageProps {
  params: { id: string }
}

async function UserPage({ params }: UserPageProps) {
  const self = await getCurrentUser()

  if (!self) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const user = await getUser(params.id)
  if (!user) {
    notFound()
  }

  const isMe = self.id === user.id

  return (
    <DashboardShell>
      <DashboardHeader heading={user.name} text={user.bio || ""} />
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
              href="/home"
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

          {isMe ? (
            user.works?.length ? (
              <Link href={`/workshop/${params.id}/application`}>
                <span className="font-bold text-yellow-300 hover:underline">
                  {user.works.length}
                </span>{" "}
                open application{user.works.length > 1 ? "s" : ""}
              </Link>
            ) : (
              "No open applications"
            )
          ) : (
            <Link href={`/workshop/${params.id}/application`}>
              <button className={cn(buttonVariants())}>
                Invite to Connect
              </button>
            </Link>
          )}
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Bio</h2>
              <p className="mb-4 text-muted-foreground">{user.bio}</p>
            </div>
          </div>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                What I'm Working On
              </h2>
              <p className="mb-4 text-muted-foreground">{user.workingOn}</p>
            </div>
          </div>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                What I'm Looking For
              </h2>
              <p className="mb-4 text-muted-foreground">{user.lookingFor}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default withORM(UserPage)
