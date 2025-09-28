"use client"

import * as React from "react"
import {
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/layout/dashboard/nav-main"
import { NavHistory } from "@/components/layout/dashboard/nav-history"
import { NavUser } from "@/components/layout/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useSelector } from "react-redux"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const { theme, systemTheme } = useTheme()
  const { navMain } = useSelector((state) => state.dashboard)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const currentTheme = theme === "system" ? systemTheme : theme
  const logoSrc =
    currentTheme === "light"
      ? "/pixelpilot-black.svg"
      : "/pixelpilot-white.svg"
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={"border-b"}>
        <div className="flex items-center py-2 px-2">
          <Link href="/">
            {mounted ? (
              <Image
                src={logoSrc}
                alt="logo"
                width={31}
                height={31}
                priority
              />
            ) : (
              <div className="h-[31px] w-[31px]" />
            )}
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavHistory projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
