import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingBusiness() {
  return (
    <Card className="bg-background border-muted max-w-[25rem] max-sm:max-w-[20rem]">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-2">Team</h2>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold">$</span>
          <span className="text-6xl font-bold">25</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <p className="text-muted-foreground mb-6">
          Supercharge your team&apos;s work with a secure, collaborative
          workspace
        </p>
        <Button
          variant="outline"
          className="w-full mb-6 bg-background text-foreground hover:bg-accent"
        >
          Upgrade to Team
        </Button>
        <ul className="space-y-4">
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-primary flex-shrink-0" />
            <span>Everything in Plus</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-primary flex-shrink-0" />
            <span>
              Unlimited access to GPT-4o mini and higher message limits on
              GPT-4, GPT-4o, and tools like DALL-E, web browsing, data analysis,
              and more
            </span>
          </li>
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-primary flex-shrink-0" />
            <span>Create and share GPTs with your workspace</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-primary flex-shrink-0" />
            <span>Admin console for workspace management</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-primary flex-shrink-0" />
            <span>
              Team data excluded from training by default.{" "}
              <Link href="#" className="text-primary hover:underline">
                Learn more
              </Link>
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          For 2+ users, billed annually
        </p>
      </CardFooter>
    </Card>
  );
}
