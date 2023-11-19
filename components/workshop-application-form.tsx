"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, Workshop } from "@prisma/client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Stripe } from "stripe"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { applicationSchema } from "@/lib/validations/application"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DatePicker } from "@/components/ui/datepicker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectInput } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface WorkshopApplicationFormProps extends ButtonProps {
  workshop: Workshop
  application?: Application
}

type FormData = z.infer<typeof applicationSchema>

export function WorkshopApplicationForm({
  className,
  variant,
  workshop,
  application,
  ...props
}: WorkshopApplicationFormProps) {
  const router = useRouter()
  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      about: application?.about || "",
      statement: application?.statement || "",
      sample: application?.sample || "",
    },
  })

  const { errors } = formState
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  if (!workshop) {
    return (
      <Card>
        <CardHeader>Uh oh</CardHeader>
        <CardContent>This workshop does not / no longer exists</CardContent>
      </Card>
    )
  }

  async function onSubmit(data: FormData) {
    try {
      //

      console.log(58)
      setIsSaving(true)
      console.log("ok")
      const response = await axios.post(`/api/applications`, {
        statement: data.statement,
        about: data.about,
        sample: data.sample,
        workshopId: workshop.id,
        status: "Draft",
      })
      console.log("response", response)
      // console.log("response.data", response?.data);
      setIsSaving(false)

      if (response?.statusText !== "OK") {
        return toast({
          title: "Something went wrong.",
          description: "Your application was not submitted. Please try again.",
          variant: "destructive",
        })
      }

      toast({
        description: "Application submitted.",
      })

      console.log(response)
      router.push(`/workshop/${workshop.id}/application/${response.data?.id}`)
    } catch (error) {
      console.error(error)
      setIsSaving(false)
    }
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Status:{" "}
            <span className="text-yellow-300">
              {application?.status || "Draft"}
            </span>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 grid gap-2">
            <Label htmlFor="name">About You</Label>
            <p className="text-muted-foreground">
              Share a little about your background and experience
            </p>
            <Textarea
              id="about"
              className="w-full"
              {...register("about", { required: true })}
            />
            {errors?.about && (
              <p className="px-1 text-xs text-red-600">
                {errors.about.message}
              </p>
            )}
          </div>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="statement">Statement</Label>
            <p className="text-muted-foreground">
              Why do you want to join this workshop?
            </p>
            <Textarea
              id="tags"
              className="w-full"
              {...register("statement", { required: true })}
            />
            {errors?.statement && (
              <p className="px-1 text-xs text-red-600">
                {errors.statement.message}
              </p>
            )}
          </div>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="sample">Sample</Label>
            <p className="text-muted-foreground">
              Share a sample of your work, or a link to a sample
            </p>
            <Textarea
              id="sample"
              className="w-full"
              {...register("sample", { required: true })}
            />
            {errors?.sample && (
              <p className="px-1 text-xs text-red-600">
                {errors.sample.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="mr-6 grid gap-2">
            <button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
