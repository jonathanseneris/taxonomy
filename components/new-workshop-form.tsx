"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { workshopSchema } from "@/lib/validations/workshop";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectInput } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface NewWorkshopFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">;
}

type FormData = z.infer<typeof workshopSchema>;

export function NewWorkshopForm({
  user,
  className,
  ...props
}: NewWorkshopFormProps) {
  const router = useRouter();
  const { handleSubmit, register, control, formState, watch } =
    useForm<FormData>({
      resolver: zodResolver(workshopSchema),
      defaultValues: {
        open: true,
        archived: false,
        paid: false,
      },
    });

  const { errors } = formState;
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    console.log("ok");
    const response = await fetch(`/api/workshops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        targetSize: data.targetSize,
        startDate: data.startDate,
        paid: data.paid,
        price: data.price,
        submissionLength: data.submissionLength,
        open: true,
        archived: false,
      }),
    });
    console.log("response", response);
    console.log("response.data", response.data);
    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Workshop created.",
    });

    console.log(response.data);
    router.push(`/workshops/${response.data.id}`);
  }

  const isPaid = watch("paid");

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <Card.Header>
          <Card.Title>Create a New Workshop</Card.Title>
          {/*<Card.Description>*/}
          {/*  What do you want to name your workshop?*/}
          {/*</Card.Description>*/}
        </Card.Header>
        <Card.Content>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name", { required: true, maxLength: 50 })}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="w-[400px]"
              size={32}
              {...register("description", { required: true })}
            />
            {errors?.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="targetSize">Target Size</Label>
            <Input
              required
              id="targetSize"
              placeholder="About how many people do you want to join?"
              type="number"
              className="w-[400px]"
              size={32}
              {...register("targetSize")}
            />
            {errors?.targetSize && (
              <p className="px-1 text-xs text-red-600">
                {errors.targetSize.message}
              </p>
            )}
          </div>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="submissionSize">Submission Length</Label>
            <SelectInput
              required
              control={control}
              name="submissionLength"
              placeholder="Select a length"
              options={[
                {
                  value: "Short",
                  label: "Short (Mostly 1-3 pagers)",
                },
                { value: "Medium", label: "Medium (4-10 pages)" },
                { value: "Long", label: "Long (10+)" },
                {
                  value: "Book",
                  label: "Chapters or segments for book-length work",
                },
              ]}
            />
            {errors?.submissionLength && (
              <p className="px-1 text-xs text-red-600">
                {errors.submissionLength.message}
              </p>
            )}
          </div>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker
              className="w-[400px]"
              size={32}
              name="startDate"
              control={control}
            />
            {errors?.startDate && (
              <p className="px-1 text-xs text-red-600">
                {errors.startDate.message}
              </p>
            )}
          </div>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="paid">Paid?</Label>
            <SelectInput
              required
              control={control}
              name="paid"
              placeholder="Is there a fee?"
              options={[
                {
                  value: "No",
                  label: "No, it's free",
                },
                { value: "Yes", label: "Yes" },
              ]}
            />

            {errors?.paid && (
              <p className="px-1 text-xs text-red-600">{errors.paid.message}</p>
            )}
          </div>
          {isPaid && (
            <div className="mt-6 grid gap-2">
              <Label htmlFor="price">Cost</Label>
              <Input
                id="price"
                className="w-[400px]"
                size={32}
                {...register("price")}
              />
              {errors?.price && (
                <p className="px-1 text-xs text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
          )}
        </Card.Content>
        <Card.Footer>
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
        </Card.Footer>
      </Card>
    </form>
  );
}
