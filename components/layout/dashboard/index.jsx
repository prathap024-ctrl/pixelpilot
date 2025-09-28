"use client"
import { AppSidebar } from "@/components/layout/dashboard/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChatUI } from "@/components/layout/index";
import { ModeToggle } from "./mode-toggle";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function DashboardPage() {
  const currentPage = useSelector((state) => state.dashboard.active);

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("sidebarState")
    if (saved) {
      setOpen(saved === "open")
    }
  }, [])

  const handleOpenChange = (value) => {
    setOpen(value)
    localStorage.setItem("sidebarState", value ? "open" : "closed")
  }
  
  const renderPage = () => {
    switch (currentPage) {
      case "playground":
        return <ChatUI />;
      case "settings":
        return <div>Settings</div>;
      default:
        return <div>Page not found</div>;
    }
  };

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider open={open} onOpenChange={handleOpenChange}>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 border-b border-border transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center w-full justify-between gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <h2 className="text-md font-medium">PixelPilot</h2>
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>

        </header>
        <div className="flex flex-1 flex-col gap-4">
          {renderPage()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
