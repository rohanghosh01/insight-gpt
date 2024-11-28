"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, ArrowUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { RootContext } from "@/context/rootContext";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const chatId = pathname.split("/")[1];
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isGenerating, setIsGenerating } = useContext(RootContext);

  const addNewChat = (newChat: any) => {
    queryClient.setQueryData(["chats"], (oldData: any) => {
      if (!oldData || !Array.isArray(oldData.pages)) {
        console.error("Invalid oldData structure:", oldData);
        return oldData;
      }

      return {
        ...oldData,
        pages: [
          {
            ...oldData.pages[0],
            results: [newChat, ...(oldData.pages[0]?.results || [])],
            count: oldData.pages[0]?.count + 1,
          },
          ...oldData.pages.slice(1),
        ],
      };
    });
  };
  const addNewMessage = (newMessage: any) => {
    queryClient.setQueryData(["messages"], (oldData: any) => {
      if (!oldData || !Array.isArray(oldData.pages)) {
        console.error("Invalid oldData structure:", oldData);
        return oldData;
      }

      return {
        ...oldData,
        pages: [
          {
            ...oldData.pages[0],
            results: [...(oldData.pages[0]?.results || []), newMessage], // Append to the end
            count: oldData.pages[0]?.count + 1, // Increment the count
          },
          ...oldData.pages.slice(1),
        ],
      };
    });
  };

  const handleSendMessage = async (content: string, id: string) => {
    try {
      setIsGenerating(true);
      if (!chatId) {
        router.push(`/${id}`);
      }
      const { data } = await axios.post("/api/messages", {
        message: content,
        chatId: id,
      });
      addNewMessage(data?.requestData);
      addNewMessage(data?.responseData);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      if (chatId) {
        handleSendMessage(message, chatId);
      } else {
        try {
          setLoading(true);
          const { data } = await axios.post("/api/chat", { title: message });
          addNewChat(data);
          handleSendMessage(message, data?.id);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error adding chat:", error);
        }
      }
      setMessage("");
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scrollHeight
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height on message change
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* {loading && (
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          <span className="animate-pulse">AI is thinking...</span>
        </div>
      )} */}

      <div className="flex items-center bg-muted  rounded-2xl px-4 py-3 shadow-sm w-full max-w-3xl max-sm:max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Dynamic Resizing Textarea */}
          <textarea
            ref={textareaRef}
            placeholder="Message InsightGPT"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent text-gray-90 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none px-3 resize-none min-h-[2.5rem] max-h-[15rem] h-full overflow-hidden overflow-y-auto"
            onKeyDown={handleKeyDown}
          />
          <div className="flex w-full">
            <Button aria-label="file" variant="ghost">
              <Paperclip className="w-5 h-5 rotate-[-46deg]" />
            </Button>

            <Button
              type="submit"
              className="ml-auto rounded-full"
              aria-label="Send"
              size="icon"
              disabled={!!!message.length}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
