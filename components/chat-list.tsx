"use client";

import { Loader } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import axios from "axios";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ChatItem from "./chat-item";

export function ChatList() {
  const getChats = async ({ pageParam }: any) => {
    try {
      let res = await axios.get("/api/chat", {
        params: {
          limit: 20,
          offset: pageParam,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
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
    queryKey: ["chats"],
    queryFn: getChats,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages) => {
      return lastPage?.nextOffset;
    },
  });

  return status === "pending" ? (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="overflow-y-auto h-[80vh]">
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group?.results.map((item: any) => (
            <Fragment key={item?.id}>
              <ChatItem item={item} />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <div>
        <div onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? (
            <div className="w-full flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : hasNextPage ? (
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem className="cursor-pointer">
                  <SidebarMenuButton asChild>
                    <span>Load More</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          ) : null}
        </div>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? (
          <div className="w-full flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
