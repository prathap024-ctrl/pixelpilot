import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, useSidebar } from '@/components/ui/sidebar'
import { MoreHorizontal } from 'lucide-react'
import React, { memo } from 'react'

export const MessageThread = memo(({

}) => {
    const { isMobile } = useSidebar()

    if (error) {
        return (
            <div>{error.message}</div>
        )
    }

    return (
        <div>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel>History</SidebarGroupLabel>
                {isLoading ? (
                    <>
                        <div className="w-full">
                            <SidebarMenuSkeleton />
                            <SidebarMenuSkeleton />
                            <SidebarMenuSkeleton />
                            <SidebarMenuSkeleton />
                            <SidebarMenuSkeleton />
                        </div>
                    </>
                ) : (
                    <>
                        <SidebarMenu>
                            {Array.isArray(threads) ? threads.map((th) => (
                                <SidebarMenuItem key={th.id}>
                                    <SidebarMenuButton asChild>
                                        <button type="button" onClick={activeThread}>
                                            <span className="truncate">{th.title || "New Chat"}</span>
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
                                            <DropdownMenuItem onClick={() => onDeleteThread?.(th.id)}>
                                                <Trash2 className="text-muted-foreground" />
                                                <span>Delete Chat</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            )) : null}
                        </SidebarMenu>
                    </>
                )}
            </SidebarGroup>
        </div>
    )
})
