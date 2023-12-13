import * as React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { getApplication, getOpenApplications, getWorkshop } from "@/queries"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ApplicationSubmitButton } from "@/components/application-submit-button"
import { ApplicationsTabs } from "@/components/application-tabs"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { WorkshopApplicationForm } from "@/components/workshop-application-form"

export const metadata = {
  title: "Workshop Application",
  description: "Apply to a workshop.",
}

export default async function WorkshopApplicationPage({ params }) {
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
    : await getApplication(params.id, user.id)

  const openApplications = isMyWorkshop
    ? await getOpenApplications(params.id)
    : null

  const canSubmit =
    application?.status === "Draft" &&
    application?.about &&
    application?.statement &&
    application?.sample

  console.log("openApplications", openApplications)

  if (isMyWorkshop) {
    if (!openApplications?.length) {
      return (
        <DashboardShell>
          <DashboardHeader heading="Review Applications" text={workshop.name} />
          <p>
            No more applications to review. Go{" "}
            <Link className="text-yellow-300" href={`/workshop/${workshop.id}`}>
              back
            </Link>
            ?
          </p>
        </DashboardShell>
      )
    }

    return (
      <DashboardShell>
        <DashboardHeader heading="Review Applications" text={workshop.name} />
        <ApplicationsTabs openApplications={openApplications} />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Workshop Application" text={workshop.name} />
      {canSubmit && (
        <div className="w-50">
          <ApplicationSubmitButton
            application={application}
            workshop={workshop}
          />
        </div>
      )}
      <div className="grid gap-10">
        <WorkshopApplicationForm
          workshop={workshop}
          application={application}
        />
      </div>
    </DashboardShell>
  )
}
