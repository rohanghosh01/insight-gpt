"use client";
import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const queryClient = new QueryClient();
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

  // if (!user) {
  //   redirect("/auth");
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header open={open} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
