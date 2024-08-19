"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { User } from "@/entities"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name" | "bio">
}

type FormData = z.infer<typeof userNameSchema>

export function ProfileForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
      location: user?.location || "",
      bio: user?.bio || "",
      workingOn: user?.workingOn || "",
      lookingFor: user?.lookingFor || "",
      isAvailable: !!user?.isAvailable,
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        bio: data.bio,
        location: data.location,
        workingOn: data.workingOn,
        lookingFor: data.lookingFor,
        isAvailable: data.isAvailable,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your settings were not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your settings have been updated.",
    })

    router.refresh()
  }
  console.log("errors", errors)
  return (
    <Form {...form}>
      <form
        className={cn(className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed on your profile and
                    in emails.
                  </FormDescription>
                  <FormMessage>
                    {errors?.name && (
                      <p className="px-1 text-xs text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    For finding in-person meetups, or if it's relevant to your
                    work. Not required.
                  </FormDescription>
                  <FormMessage>
                    {errors?.location && (
                      <p className="px-1 text-xs text-red-600">
                        {errors.location.message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio & Experience</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your bio" {...field} />
                  </FormControl>
                  <FormDescription>
                    What's your writing background? Anything that would be
                    helpful to know?
                  </FormDescription>
                  <FormMessage>
                    {errors?.bio && (
                      <p className="px-1 text-xs text-red-600">
                        {errors.bio.message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workingOn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you working on?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your workingOn" {...field} />
                  </FormControl>
                  <FormDescription>
                    A project, a class, a job, or anything else you are working
                    on.
                  </FormDescription>
                  <FormMessage>
                    {errors?.workingOn && (
                      <p className="px-1 text-xs text-red-600">
                        {errors.workingOn.message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lookingFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you looking for?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Writers to share regular feedback... People to join a workshop..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What kind of people are you looking to connect with? What
                    kind of feedback are you looking for?
                  </FormDescription>
                  <FormMessage>
                    {errors?.lookingFor && (
                      <p className="px-1 text-xs text-red-600">
                        {errors.lookingFor.message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Show me in the directory
                    </FormLabel>
                    <FormDescription>
                      Disabling this does not affect your ability to work with
                      existing connections.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage>
              {errors?.isAvailable && (
                <p className="px-1 text-xs text-red-600">
                  {errors.isAvailable.message}
                </p>
              )}
            </FormMessage>
          </CardContent>

          <CardFooter>
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
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
