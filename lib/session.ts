import withORM from "@/orm/withORM"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

async function unwrappedFunction() {
  console.log("getCurrentUser")
  const session = await getServerSession(authOptions)
  console.log("session", session)
  return session?.user
}

export const getCurrentUser = withORM(unwrappedFunction)
