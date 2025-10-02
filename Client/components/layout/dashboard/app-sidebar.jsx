"use client"

import React, { useEffect, useState } from "react"
import { NavUser } from "@/components/layout/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Folder, Forward, Frame, LucideTimer, MoreHorizontal, PieChart, Plus, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useDashboard } from "@/store/store"


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
    },
    {
      name: "Sales & Marketing",
      url: "#",
    },
    {
      name: "Travel",
      url: "#",
    },
  ],
}

export function AppSidebar({
  threads = [],
  activeThreadId,
  onNewThread,
  onSelectThread,
  onDeleteThread,
  ...props
}) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const setCurrentPage = useDashboard((state) => state.setCurrentPage)
  useEffect(() => setMounted(true), [])
  const { isMobile } = useSidebar()
  const currentTheme = theme === "system" ? systemTheme : theme
  const logoSrc =
    currentTheme === "light"
      ? "/pixelpilot-black.svg"
      : "/pixelpilot-white.svg"

  const handleClick = () => {
    setCurrentPage("chat");
    if (onNewThread) onNewThread(); // safe call
  };


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={"border-b"}>
        <div className="flex items-center justify-between py-2 px-2">
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
          <div>
            <SidebarTrigger className="-ml-2" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="group-data-[collapsible=icon] mt-2 px-2 space-y-1">
          <SidebarMenuButton className={"flex items-center gap-4"} onClick={handleClick}>
            <Plus />
            <span className="">New Chat</span>
          </SidebarMenuButton>
          <SidebarMenuButton className={"flex items-center gap-4"} onClick={() => setCurrentPage("scheduleTask")}>
            <LucideTimer />
            <span className="">Scheduled Task</span>
          </SidebarMenuButton>
        </div>
        <Separator />
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarMenu>
            {threads.map((thread) => (
              <SidebarMenuItem key={thread.id}>
                <SidebarMenuButton asChild isActive={thread.id === activeThreadId}>
                  <button type="button" onClick={() => onSelectThread?.(thread.id)}>
                    <span className="truncate">{thread.title || "New Chat"}</span>
                  </button>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem onClick={() => onDeleteThread?.(thread.id)}>
                      <Trash2 className="text-muted-foreground" />
                      <span>Delete Chat</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
