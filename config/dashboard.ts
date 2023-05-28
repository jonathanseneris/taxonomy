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
      title: "Dashboard",
      href: "/app",
      icon: "dashboard",
    },
    {
      title: "Directory",
      href: "/app/directory",
      icon: "directory",
    },
    {
      title: "Billing",
      href: "/app/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/app/settings",
      icon: "settings",
    },
  ],
}
