import { NextPage } from "next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const TooltipComponent: NextPage<Props> = ({
  children,
  title,
  side = "bottom",
  className,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
