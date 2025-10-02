"use client"
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/layout/dashboard/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { ChatScreen } from "../ChatScreen";
import { ChatInput } from "../ChatInput";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useDashboard } from "@/store/store";
import { ScheduleTaskPage } from "@/components/layout/scheduleTask/ScheduleTask";
import { NavbarComp } from "./navbar";

export function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(true)
  const [text, setText] = useState('');

  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const currentPage = useDashboard((state) => state.currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case "chat":
        return (
          <>
            <ChatScreen
              messages={messages}
              regenerate={regenerate}
              status={status}
            />
            <ChatInput
              handleSubmit={handleSubmit}
              handleSuggestionClick={handleSuggestionClick}
              setText={setText}
              text={text}
              status={status}
              messages={messages}
            />
          </>
        )
      case "scheduleTask":
        return <ScheduleTaskPage />

      default:
        break;
    }
  }

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("sidebarState")
    if (saved) {
      setOpen(saved === "open")
    }
  }, [])

  const { status, sendMessage, messages, regenerate } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    })
  });

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

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider open={open} onOpenChange={handleOpenChange}>
      <AppSidebar

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
      </SidebarInset>
    </SidebarProvider>
  );
}


