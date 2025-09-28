"use client"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { setActivePage } from "@/store/slice/DashboardSlice";
import { Settings2, SquareTerminal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const iconMap = {
  "settings2": Settings2,
  "playgroundTerminal": SquareTerminal
}

export function NavMain({
  items
}) {
  const isActive = useSelector((state) => state.dashboard.active)
  const dispatch = useDispatch()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          return (<Collapsible
            key={item.key}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible" >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} onClick={() => dispatch(setActivePage(item.key))} isActive={isActive === item.key}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>)
        })}
      </SidebarMenu>
    </SidebarGroup >
  );
}
