"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "next-auth";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UserMenu from "@/components/user-menu";
import { Bot, Menu, Plus } from "lucide-react";
import axios from "axios";
import BrandLogo from "./logo";

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const addNewChat = async () => {
    try {
      const response = await axios.post("/api/chat", {
        title: "New chat",
      });

      return response;
    } catch (error) {
      console.log("> error addNewChat >", error);
    }
  };

  const handleClick = async () => {
    // Open a new chat window
    let res = await addNewChat();
    let uid = res?.data.id;
    router.push(`/${uid}`);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-2 top-2 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-muted/40 backdrop-blur-xl md:relative"
          >
            <div className="flex h-14 items-center px-4 mx-auto">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <BrandLogo className="h-6 w-6 dark:invert" />
                AI Chat
              </Link>
            </div>
            <Separator />
            <div className="flex flex-1 flex-col gap-4 p-4">
              <Button asChild onClick={handleClick}>
                <div className="justify-start gap-2 cursor-pointer">
                  <Plus />
                  New Chat
                </div>
              </Button>
              <ScrollArea className="flex-1">
                {/* Chat list will go here */}
              </ScrollArea>
            </div>
            <Separator />
            <div className="p-4">
              <UserMenu user={user} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
