import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPersonal() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto p-6">
      {/* Free Tier */}
      <Card className="bg-background border-muted max-w-[25rem]">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-2">Free</h2>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold">$</span>
            <span className="text-6xl font-bold">0</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Explore how AI can help you with everyday tasks
          </p>
          <Button variant="secondary" className="w-full mb-6" disabled>
            Your current plan
          </Button>
          <ul className="space-y-4">
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Assistance with writing, problem solving and more</span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Access to GPT-4o mini</span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Limited access to GPT-4o</span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>
                Limited access to data analysis, file uploads, vision, web
                browsing, and image generation
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Use custom GPTs</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Have an existing plan? See{" "}
            <Link href="#" className="text-primary hover:underline">
              billing help
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Plus Tier */}
      <Card className="bg-background border-muted max-w-[25rem]">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-2">Plus</h2>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold">$</span>
            <span className="text-6xl font-bold">20</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Boost your productivity with expanded access
          </p>
          <a
            href="#"
            // href="https://buy.stripe.com/test_fZeg2G6ZmfuGaPe4gg"
            // target="_blank"
          >
            <Button className="w-full mb-6 bg-emerald-500 hover:bg-emerald-600">
              Upgrade to Plus
            </Button>
          </a>
          <ul className="space-y-4">
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Everything in Free</span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Early access to new features</span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Access to OpenAI o1-preview, OpenAI o1-mini</span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Access to GPT-4o, GPT-4o mini, GPT-4</span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Up to 5x more messages for GPT-4o</span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>
                Access to data analysis, file uploads, vision, web browsing, and
                image generation
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Access to Advanced Voice Mode</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Limits apply</p>
        </CardFooter>
      </Card>
    </div>
  );
}
