"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Link from "next/link";
import Logo from "../../Logo";
import User from "./User";

const DesktopNav = () => {
  const paths = useNavigation();
  return (
    <>
      <div className="w-size-sidebar h-full border-r lg:grid grid-rows-[1fr_auto] absolute z-10 pointer-events-none hidden">
        <nav className="w-size-navbar h-full bg-card border-r flex flex-col justify-between items-center relative pointer-events-auto">
          <div className="w-full h-size-topbar border-b flex flex-col justify-between">
            <Logo />
          </div>

          <div className="w-full h-full p-2 flex flex-col justify-between items-center gap-2">
            <ul className="flex flex-col gap-2">
              {paths.map((path, id) => (
                <li key={id} className="relative">
                  <Link
                    href={path.href}
                    className={cn({
                      "pointer-events-none": path.active,
                    })}
                  >
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
            </ul>
            <ul className="flex flex-col gap-2">
              <ThemeToggle />
            </ul>
          </div>
        </nav>

        <div className="h-size-botbar p-4 border-t bg-card flex justify-between items-center pointer-events-auto">
          <User />

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
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
