"use client"

import React, { memo, useCallback, useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useDashboard } from "@/store/DashboardStore"
/* import { MessageThread } from "./messageThread" */
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  LucideTimer,
  Plus
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { MessageThread } from "./messageThread"

export const AppSidebar = memo(({
  isLoading,
  error,
  session,
  ...props
}) => {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const setCurrentPage = useDashboard((state) => state.setCurrentPage)
  const { isMobile } = useSidebar()
  const router = useRouter()

  const currentTheme = theme === "system" ? systemTheme : theme
  const logoSrc =
    currentTheme === "light"
      ? "/pixelpilot-black.svg"
      : "/pixelpilot-white.svg"

  useEffect(() => setMounted(true), [])

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
          toast.success("Logged out successfully", { closeButton: true });
        },
      },
    })
  }


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
          <SidebarMenuButton className={"flex items-center gap-4"} onClick={() => setCurrentPage("newChat")}>
              <Plus />
              <span className="">New Chat</span>
          </SidebarMenuButton>
          <SidebarMenuButton className={"flex items-center gap-4"} onClick={() => setCurrentPage("scheduleTask")}>
            <LucideTimer />
            <span className="">Scheduled Task</span>
          </SidebarMenuButton>
        </div>
        <Separator />
        <div>
          {/* <MessageThread

          /> */}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">{session?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{session?.user?.name}</span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">{session?.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{session?.user?.name}</span>
                  <span className="truncate text-xs">{session?.user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
})
