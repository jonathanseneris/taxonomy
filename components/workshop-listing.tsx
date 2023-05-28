import Link from "next/link"
import { Workshop } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/post-operations"

interface PostItemProps {
  workshop: Pick<Workshop, "id" | "name" | "createdBy" | "createdAt">
}

export function WorkshopListing({ workshop }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${workshop.id}`}
          className="font-semibold hover:underline"
        >
          {workshop.name}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(workshop.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations workshop={{ id: workshop.id, title: workshop.title }} />
      {/* <PostDeleteButton workshop={{ id: workshop.id, title: workshop.title }} /> */}
    </div>
  )
}

WorkshopListing.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
