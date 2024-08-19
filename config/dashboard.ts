import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Me!",
      href: "/settings",
      icon: "star",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Directory",
      href: "/directory",
      icon: "directory",
    },
    {
      title: "Billing",
      href: "/billing",
      icon: "billing",
    },
  ],
}
