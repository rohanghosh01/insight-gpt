import { X } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingPersonal from "./personal-card";
import PricingBusiness from "./business-card";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-grow justify-center flex-col">
      <div className="w-full h-40 flex items-center justify-center relative">
        <span className="flex text-3xl font-semibold">Upgrade your plan</span>
        <Link href="/">
          <X className="absolute top-5 right-4 text-muted-foreground cursor-pointer" />
        </Link>
      </div>
      <div className="flex items-center justify-center w-full">
        <PricingPersonal />
        {/* <Tabs
          defaultValue="personal"
          className="w-full flex flex-col items-center"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-full max-w-[200px] justify-center items-center">
            <TabsTrigger value="personal" className="rounded-full">
              Personal
            </TabsTrigger>
            <TabsTrigger value="business" className="rounded-full">
              Business
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PricingPersonal />
          </TabsContent>
          <TabsContent value="business">
            <PricingBusiness />
          </TabsContent>
        </Tabs> */}
      </div>
    </div>
  );
};

export default Page;
