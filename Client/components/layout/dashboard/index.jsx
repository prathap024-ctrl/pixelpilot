"use client"
import { useCallback, useEffect, useState } from "react";
import { AppSidebar } from "@/components/layout/dashboard/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { useDashboard } from "@/store/DashboardStore";
import { ScheduleTaskPage } from "@/components/layout/scheduleTask/ScheduleTask";
import { NavbarComp } from "./navbar";
import { useSharedChatContext } from "../ChatProvider";
import { useRouter } from "next/navigation";
import { Chat } from "../Chat-client";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(true)
  const currentPage = useDashboard((state) => state.currentPage);
  const router = useRouter()
  const { session, messages, regenerate, status, sendMessage, text, setText, isPending, error } = useSharedChatContext()

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case "chat":
        return (
          <>
            <Chat
              messages={messages}
              regenerate={regenerate}
              status={status}
              handleSubmit={handleSubmit}
              handleSuggestionClick={handleSuggestionClick}
              setText={setText}
              text={text} /> 
          </>
        )
      case "scheduleTask":
        return <ScheduleTaskPage />

      default:
        break;
    }
  }, [currentPage, messages, regenerate, status, text])


  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("sidebarState")
    if (saved) {
      setOpen(saved === "open")
    }
  }, [])


  const handleSubmit = (message) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      {
        text: message.text || 'Sent with attachments',
        files: message.files
      },
    );
    setText('');
  };
  const handleSuggestionClick = (suggestion) => {
    sendMessage({ text: suggestion });
  };

  const handleOpenChange = (value) => {
    setOpen(value)
    localStorage.setItem("sidebarState", value ? "open" : "closed")
  }

  useEffect(() => {
    if (!session) {
      router.replace('/auth/sign-in')
    }
  }, [session])

  if (!mounted) {
    return null
  }

  if (isPending) {
    return null
  }
  if (error) {
    return <div className="text-center">{error.message}</div>
  }


  return (
    <SidebarProvider open={open} onOpenChange={handleOpenChange}>
      <AppSidebar
        session={session}
        error={error}
      />
      <SidebarInset>
        <>
          <NavbarComp />
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                {renderPage()}
              </div>
            </div>
          </div>
        </>
      </SidebarInset >
    </SidebarProvider >
  );
}


