import { redirect } from "next/navigation"
import withORM from "@/orm/withORM"
import { getUser } from "@/queries"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { ProfileForm } from "@/components/profile-form"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const data = await getUser(user.id)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <ProfileForm user={data} />
      </div>
    </DashboardShell>
  )
}

export default withORM(SettingsPage)
