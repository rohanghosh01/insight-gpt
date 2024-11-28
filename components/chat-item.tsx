import { NextPage } from "next";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  Check,
  MoreHorizontal,
  Pencil,
  Trash,
  Upload,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Separator } from "./ui/separator";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface Props {
  item: any;
}

const DeleteDialog = ({ open, setOpen, item }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const removeChat = (chatId: string) => {
    queryClient.setQueryData(["chats"], (oldData: any) => {
      if (!oldData || !Array.isArray(oldData.pages)) {
        console.error("Invalid oldData structure:", oldData);
        return oldData;
      }

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          results: page.results.filter((chat: any) => chat.id !== chatId),
          count:
            page.count -
            (page.results.some((chat: any) => chat.id === chatId) ? 1 : 0),
        })),
      };
    });
  };
  const handleDelete = async () => {
    try {
      await axios.delete("/api/chat", {
        params: {
          id: item.id,
        },
      });
      removeChat(item.id);
      router.push("/");
    } catch (error) {
      console.error("error delete chat", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete chat?</AlertDialogTitle>
          <Separator />
          <AlertDialogDescription className="text-primary text-base">
            This will delete <span className="font-bold ">{item?.title}.</span>
            <br />
            <span className="text-sm">
              To clear any memories from this chat, visit your settings.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600 rounded-full"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ChatItem: NextPage<Props> = ({ item }) => {
  const router = useRouter();
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const chatId = pathname.split("/")[1];
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [text, setText] = useState(item?.title);
  const [title, setTitle] = useState(item?.title);
  const inputRef = useRef<any>(null);

  const handleChatClick = (id: string) => {
    router.push(`/${id}`);
    if (isMobile) {
      if (openMobile) {
        setOpenMobile(false);
      }
    }
  };

  const handleBlur = async () => {
    setRenameOpen(false);
    if (text !== item?.title) {
      try {
        await axios.put("/api/chat", {
          id: item.id,
          title: text,
        });
        setTitle(text);
      } catch (error) {
        console.log("error edit name", error);
      }
    }
  };

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem className="cursor-pointer">
            <SidebarMenuButton
              className={cn(chatId === item.id ? "bg-sidebar-accent " : "")}
              onClick={() => handleChatClick(item.id)}
            >
              {renameOpen ? (
                <div className="flex relative overflow-visible">
                  <input
                    ref={inputRef}
                    onBlur={() => {
                      handleBlur();
                    }}
                    autoFocus
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    className="bg-transparent"
                  />
                </div>
              ) : (
                <p className="overflow-hidden line-clamp-1 w-[90%]">
                  {title || "New chat"}
                </p>
              )}
            </SidebarMenuButton>
            {!renameOpen && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover className="bg-gradient-to-l from-sidebar-accent to-sidebar-accent">
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-32  rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  {/* <DropdownMenuItem>
                  <Upload className="h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={() => {
                      setRenameOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>
                  <Archive className="h-4 w-4" />
                  <span>Archive</span>
                </DropdownMenuItem> */}

                  <DropdownMenuItem
                    onClick={() => {
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {openDeleteDialog && (
        <DeleteDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          item={item}
        />
      )}
    </>
  );
};

export default ChatItem;
