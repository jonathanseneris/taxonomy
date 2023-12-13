"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Application } from "@/entities"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface ApplicationSubmitButtonProps extends ButtonProps {
  application: Application
}

export function ApplicationAcceptButton({
  application,
  className,
  variant,
  ...props
}: ApplicationSubmitButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  if (!application || application.status !== "Submitted") {
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
          status: "Accepted",
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

    // const post = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    // router.push(`/workshops/${post.id}`)
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
        "bg-green-300"
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.ok className="mr-2 h-4 w-4 " />
      )}
      Accept
    </button>
  )
}
