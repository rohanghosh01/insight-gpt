"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewChat({
  prompt,
}: {
  prompt: {
    title: string;
    icon?: React.FC<any>;
    id: number;
    color?: string;
  };
}) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: prompt.title }),
      });

      if (!response.ok) throw new Error("Failed to create chat");

      const data = await response.json();
      router.push(`/${data.id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <Button
      variant="outline"
      className="rounded-full w-max"
      // onClick={handleClick}
      size="sm"
    >
      {prompt.icon ? (
        <prompt.icon
          className={cn("h-4 w-4 shrink-0", prompt.color && prompt.color)}
        />
      ) : null}

      <span className="flex-1">{prompt.title}</span>
    </Button>
  );
}
