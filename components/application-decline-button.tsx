"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Application, User } from "@/entities"
import { Stripe } from "stripe"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface ApplicationSubmitButtonProps extends ButtonProps {
  application: Application
}

export function ApplicationDeclineButton({
  application,
  className,
  variant,
  ...props
}: ApplicationSubmitButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  if (!application || application.status !== "Submitted") {
    console.log("application", application)
    return null
  }

  async function onClick() {
    setIsLoading(true)

    const response = await fetch(
      `/api/applications/${application.workshopId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          applicationId: application.id,
          status: "Declined",
        }),
      }
    )

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "The application was not updated. Please try again.",
        variant: "destructive",
      })
    }

    // This forces a cache invalidation.
    router.refresh()
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60 ": isLoading,
        },
        className,
        "bg-red-300"
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.nok className="mr-2 h-4 w-4 " />
      )}
      Decline
    </button>
  )
}
