"use client";
import {
  Bot,
  FileText,
  ImagePlus,
  PencilLine,
  AlignEndHorizontal,
  Code,
} from "lucide-react";
import NewChat from "@/components/new-chat";
import ChatInput from "@/components/chat-input";
import TypingEffect from "@/components/typing-effect";
const examplePrompts = [
  { id: 1, title: "Create image", icon: ImagePlus, color: "text-green-400" },
  { id: 2, title: "Summarize text", icon: FileText, color: "text-yellow-700" },
  { id: 3, title: "Help me write", icon: PencilLine, color: "text-pink-400" },
  {
    id: 4,
    title: "Analyze data",
    icon: AlignEndHorizontal,
    color: "text-sky-400",
  },
  {
    id: 5,
    title: "Code",
    icon: Code,
    color: "text-violet-500",
  },
  {
    id: 6,
    title: "More",
  },
];

export default function ChatPage() {
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center space-y-6 px-4">
      <div className="flex flex-col items-center justify-center space-y-2">
        <TypingEffect
          text="What can I help with?"
          speed={100}
          className="text-3xl font-bold"
        />
      </div>
      <ChatInput />
      <span className="text-muted-foreground absolute bottom-0 text-xs w-full flex items-center justify-center">
        InsightGPT can make mistakes!
      </span>
      <div className="flex gap-1 flex-wrap max-sm:justify-center max-sm:gap-3">
        {examplePrompts.map((prompt) => (
          <NewChat key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
}
