"use client";

import { Fragment, useContext, useEffect, useState } from "react";
import ChatInput from "@/components/chat-input";
import ChatMessage from "@/components/chat-message";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader, ArrowDownCircle, ArrowDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import MessageLoading from "@/components/message-loading";
import { RootContext } from "@/context/rootContext";
import { toast } from "@/hooks/use-toast";
import { routeros } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function ChatPage({ params }: any) {
  const chatId = params.id;
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [chatData, setChatData] = useState<any | null>(null);
  const { isGenerating } = useContext(RootContext);
  const router = useRouter();
  const getMessages = async ({ pageParam }: any) => {
    try {
      let res = await axios.get("/api/messages", {
        params: {
          limit: 20,
          offset: pageParam,
          chatId,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  const getChat = async () => {
    try {
      let res = await axios.get(`/api/chat/${chatId}`);
      setChatData(res.data?.result);
    } catch (error) {
      console.error("Error fetching chat:", error);
      toast({
        variant: "destructive",
        title: `Unable to load conversation ${chatId}`,
        duration: 3000,
      });
      router.push("/");
      return;
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      return lastPage?.nextOffset;
    },
  });

  useEffect(() => {
    getChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatData) {
      document.title = chatData?.title;
    }
  }, [chatData]);

  // Scroll to the bottom of the body
  const scrollToBottom = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
    setIsAtBottom(true);
  }, [isGenerating]);

  // Check if the user is at the bottom of the body
  const handleScroll = () => {
    const isUserAtBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 10; // Threshold for precision
    setIsAtBottom(isUserAtBottom);
  };

  // Add scroll event listener
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "instant",
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    // redirect("/auth");
  }

  return status === "pending" ? (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="flex flex-col justify-center items-center gap-5 mx-5 mb-[7.2rem] max-sm:justify-start overflow-y-auto">
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group?.results.map((item: any) => (
            <Fragment key={item?.id}>
              <ChatMessage data={item} />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <div onClick={() => fetchNextPage()} className="p-0  cursor-pointer">
        {isFetchingNextPage ? (
          <div className="w-full flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : hasNextPage ? (
          <span className="cursor-pointer hover:bg-muted p-1 rounded-full">
            Load More
          </span>
        ) : null}
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? (
          <div className="w-full flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : null}
      </div>
      {isGenerating && <MessageLoading />}

      {/* Button to scroll to bottom */}
      {!isAtBottom && (
        <Button
          className="fixed bottom-40 z-50   p-2 rounded-full w-8 h-8"
          onClick={scrollToBottom}
          size="icon"
        >
          <ArrowDown className="w-5 h-5" />
        </Button>
      )}

      <div className="fixed bottom-1 w-full z-50">
        <ChatInput />
        <span className="text-muted-foreground absolute bottom-0 text-xs w-full flex items-center justify-center">
          InsightGPT can make mistakes!
        </span>
      </div>
    </div>
  );
}
