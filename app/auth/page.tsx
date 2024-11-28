"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { redirect } from "next/navigation";
import BrandLogo from "@/components/logo";

export default function Login() {
  const { data: session } = useSession();
  const user = session?.user;

  // if (user) {
  //   redirect("/");
  // }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-2">
          <BrandLogo className="mx-auto h-12 w-12 dark:invert" />
          <h1 className="text-3xl font-bold">Welcome to InsightGPT</h1>
          <p className="text-muted-foreground">
            Sign in to start chatting with your AI assistant
          </p>
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
