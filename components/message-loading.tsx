import { NextPage } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import BrandLogo from "./logo";
interface Props {}

const MessageLoading: NextPage<Props> = ({}) => {
  return (
    <div className="flex items-center space-x-4 my-10">
      <BrandLogo className="h-8 w-8 rounded-full dark:invert" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px] max-sm:w-[250px]" />
        <Skeleton className="h-4 w-[300px]  max-sm:w-[200px]" />
        <Skeleton className="h-4 w-[200px] max-sm:w-[100px]" />
      </div>
    </div>
  );
};

export default MessageLoading;
