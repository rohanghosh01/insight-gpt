"use client";
import { NextPage } from "next";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
import { NavUser } from "./nav-user";
import TooltipComponent from "./tooltip-provider";
import { ModeToggle } from "./toggle-theme";
import BrandLogo from "./logo";

interface Props {
  open: boolean;
}

const Header: NextPage<Props> = ({ open }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-50 bg-background ">
      <div className="flex items-center gap-2 px-4 text-muted-foreground">
        <TooltipComponent title={open ? "Close sidebar" : "Open sidebar"}>
          <SidebarTrigger className="-ml-1" />
        </TooltipComponent>
        <Separator orientation="vertical" className="mr-0 h-4" />
        {/* <TooltipComponent title="New chat">
          <Button size="icon" className="h-7 w-7" variant="ghost">
            <SquarePen />
          </Button>
        </TooltipComponent> */}

        <Button variant="ghost">
          <BrandLogo className="dark:invert w-5 h-5" />
          <span>InsightGPT</span>
        </Button>
      </div>
      <div className="ml-auto flex h-10 items-center">
        <ModeToggle />
        <NavUser />
      </div>
    </header>
  );
};

export default Header;
