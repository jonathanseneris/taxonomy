"use client"

import { ReactNode } from "react"
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense"

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_prod_CLNzVzw12UqOi9R0qVeVqMRM9atzUPoxRFlhKH4etf9IxPD0I9kSemrXdLurtdxO"
      }
    >
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
