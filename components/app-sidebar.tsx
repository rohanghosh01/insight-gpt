import * as React from "react";
import { PenSquare, Sparkles } from "lucide-react";

import { ChatList } from "@/components/chat-list";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <PenSquare className="size-4" />
                <span className="font-semibold">New Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ChatList />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <Link href="/pricing">
            <Button variant="ghost" className="p-4 w-full h-14">
              <div className="flex gap-1 items-center">
                <Sparkles className="w-5 h-5" />
                <div className="flex flex-col items-baseline">
                  <span>Upgrade plan</span>
                  <span className="text-muted-foreground text-xs">
                    More access to the best models
                  </span>
                </div>
              </div>
            </Button>
          </Link>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
