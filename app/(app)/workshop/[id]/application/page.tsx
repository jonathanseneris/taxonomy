import * as React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { User, Workshop } from "@prisma/client"
import { format, formatDistance } from "date-fns"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApplicationAcceptButton } from "@/components/application-accept-button"
import { ApplicationDeclineButton } from "@/components/application-decline-button"
import { ApplicationSubmitButton } from "@/components/application-submit-button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { WorkshopApplicationForm } from "@/components/workshop-application-form"

export const metadata = {
  title: "Workshop Application",
  description: "Apply to a workshop.",
}

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

async function getApplication(workshopId: Workshop["id"], userId: User["id"]) {
  return await db.application.findFirst({
    where: {
      workshopId,
      userId,
    },
  })
}

async function getOpenApplications(workshopId: Workshop["id"]) {
  return await db.application.findMany({
    where: {
      workshopId,
      status: "Submitted",
    },
    include: {
      user: {
        select: {
          name: true,
          firstName: true,
          lastName: true,
          bio: true,
          email: true,
          id: true,
        },
      },
    },
  })
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
        <Tabs defaultValue={openApplications[0]?.id} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {openApplications?.map((application, i) => (
              <TabsTrigger value={application.id}>
                {application.user?.name || `Application ${i + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
          {openApplications?.map((application, i) => (
            <TabsContent value={application.id}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {application.user?.name || `Application ${i + 1}`}
                  </CardTitle>
                  <CardDescription>
                    Submitted{" "}
                    {formatDistance(application.submittedOn, new Date(), {
                      addSuffix: true,
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="about">
                      <AccordionTrigger>About</AccordionTrigger>
                      <AccordionContent>{application.about}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="statement">
                      <AccordionTrigger>Statement</AccordionTrigger>
                      <AccordionContent>
                        {application.statement}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="sample">
                      <AccordionTrigger>Sample</AccordionTrigger>
                      <AccordionContent>{application.sample}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <div className="mr-2">
                    <ApplicationAcceptButton application={application} />
                  </div>
                  <ApplicationDeclineButton application={application} />
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
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
