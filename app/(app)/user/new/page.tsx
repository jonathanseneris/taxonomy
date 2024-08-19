import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { NewWorkForm } from "@/components/new-work-form"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "New Workshop",
  description: "Create a new workshop.",
}

export default async function NewWorkshopPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="New Workshop" text="Create a new workshop." />
      <div className="grid gap-10">
        <NewWorkForm />
      </div>
    </DashboardShell>
  )
}
