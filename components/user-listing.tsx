import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface UserListingProps {
  user: Partial<User>
}

export function UserListing({ user }: UserListingProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/user/${user.id}`}
          className="font-semibold hover:underline"
        >
          {user.name}
        </Link>
        <div>
          <p className="text-sm text-slate-600">{user.location}</p>
        </div>
      </div>
      {/*<WorkshopOperations workshop={{ id: workshop.id, name: workshop.name }} />*/}
      {/* <PostDeleteButton workshop={{ id: workshop.id, title: workshop.title }} /> */}
    </div>
  )
}

UserListing.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
