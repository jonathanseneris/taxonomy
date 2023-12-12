import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(req: any, setLocalhost: string | null = null) {
  let protocol = "https:"
  let host = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host

  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost
    protocol = "http:"
  }

  return {
    protocol,
    host,
    origin: protocol + "//" + host,
  }
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
