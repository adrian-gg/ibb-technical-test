"use client";

import { buttonVariants } from "@/components/ui/button";
import { useConversations } from "@/hooks/useConversations";
import { cn } from "@/lib/utils";
import { MoreHorizontal, SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemList = ({ children, title, action: Action }: Props) => {
  const { isChatActive } = useConversations();

  return (
    <div
      className={cn(
        "w-full h-full bg-card hidden lg:flex-none lg:w-[calc(var(--size-sidebar-w)-var(--size-navbar-w))] lg:h-[calc(100%-var(--size-botbar-h))] pointer-events-auto",
        {
          block: !isChatActive,
          "lg:block": isChatActive,
        }
      )}
    >
      <div className="w-full h-full grid grid-rows-[auto_auto_1fr]">
        <div className="h-size-topbar px-3 py-2 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tighter">
            {title}
            {Action ? Action : null}
          </h1>
          <div className="flex gap-1">
            <Link
              href="#"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              href="#"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>

        {/* For future use */}
        {/* <div className="px-3 grid">
          <input
            type="text"
            className="w-full p-2 px-4 rounded-full bg-muted"
            placeholder="Search"
          />
        </div> */}

        <div className="h-full flex flex-col overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default ItemList;
