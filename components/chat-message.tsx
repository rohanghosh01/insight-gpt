import { cn } from "@/lib/utils";
import { IMessage } from "@/types/context";
import { Bot, Check, Copy, ThumbsDown, ThumbsUp, User } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { Button } from "./ui/button";
import useCopyToClipboard from "@/hooks/use-copy";
import TooltipComponent from "./tooltip-provider";
import BrandLogo from "./logo";
import MarkdownRenderer from "./markdown";
import { useState } from "react";

export default function ChatMessage({ data }: { data: IMessage }) {
  const { role, content } = data;
  const { copyText, copied } = useCopyToClipboard();
  const [like, setTike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "flex gap-3 p-0 z-10 justify-center items-baseline max-w-[45rem] max-sm:max-w-[20rem] w-full text-wrap "
      )}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow">
        {role === "assistant" ? (
          <BrandLogo className="h-4 w-4 dark:invert" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="flex items-center flex-col">
        <div
          className={cn(
            "prose prose-neutral dark:prose-invert text-wrap overflow-hidden border-0 p-5 max-sm:p-0 w-full md:min-w-[45rem]  max-w-[45rem] max-sm:max-w-[18rem] flex flex-col overflow-x-auto gap-1",
            role === "assistant"
              ? "bg-transparent rounded-2xl"
              : "bg-muted/20 rounded-2xl p-3"
          )}
        >
          <MarkdownRenderer content={content} />
          {role === "assistant" && (
            <div className="w-full">
              <div className="flex gap-4 w-fit p-2 bg-transparent rounded-xl">
                <TooltipComponent side="top" title={copied ? "copied" : "copy"}>
                  {copied ? (
                    <Check className="w-4 h-4 cursor-pointer" />
                  ) : (
                    <Copy
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => {
                        copyText(content);
                      }}
                    />
                  )}
                </TooltipComponent>
                <TooltipComponent side="top" title="Good response">
                  <ThumbsUp
                    className={cn(
                      "w-4 h-4 cursor-pointer",
                      like && "fill-current"
                    )}
                    onClick={() => {
                      setTike(!like);
                    }}
                  />
                </TooltipComponent>
                <TooltipComponent side="top" title="Bad response">
                  <ThumbsDown
                    className={cn(
                      "w-4 h-4 cursor-pointer",
                      dislike && "fill-current"
                    )}
                    onClick={() => {
                      setDislike(!dislike);
                    }}
                  />
                </TooltipComponent>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
