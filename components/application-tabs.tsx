"use client"

import * as React from "react"
import { Application } from "@/entities"
import { formatDistance } from "date-fns"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ButtonProps } from "@/components/ui/button"
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

interface ApplicationsTabsProps extends ButtonProps {
  openApplications: Application[]
}

export function ApplicationsTabs({
  openApplications,
  variant,
  ...props
}: ApplicationsTabsProps) {
  console.log("openApplications", openApplications)
  return (
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
                  <AccordionContent>{application.statement}</AccordionContent>
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
  )
}
