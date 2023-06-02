import { auth } from "@clerk/nextjs"

export async function getCurrentUser() {
  const { userId } = auth()

  return userId
}
