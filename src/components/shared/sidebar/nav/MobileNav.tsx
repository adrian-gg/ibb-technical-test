"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConversations } from "@/hooks/useConversations";
import { useNavigation } from "@/hooks/useNavigation";
import { Settings } from "lucide-react";
import Link from "next/link";
import User from "./User";

const MobileNav = () => {
  const paths = useNavigation();
  const { isChatActive } = useConversations();

  if (isChatActive) return null;

  return (
    <div className="w-full h-size-botbar lg:px-2 border bg-card flex items-center fixed bottom-0 z-10 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => (
            <li key={id} className="relative">
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={path.active ? "default" : "ghost"}
                      size="icon-xl"
                    >
                      <path.icon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{path.label}</TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <User />
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-xl">
                  <Settings size={24} />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="flex items-center gap-4">
                Settings
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
