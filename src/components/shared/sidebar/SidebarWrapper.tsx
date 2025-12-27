import React from "react";
import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";

type Props = React.PropsWithChildren<object>;

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="w-full h-dvh lg:h-full 2xl:p-8 bg-zinc-300 dark:bg-zinc-900">
      <div className="w-full h-full bg-card flex flex-col overflow-hidden lg:flex-row relative 2xl:rounded-3xl 2xl:rounded-tl-none 2xl:drop-shadow-md">
        <MobileNav />
        <DesktopNav />
        <main className="w-full h-[calc(100%-80px)] pl-0 grid lg:grid-cols-[auto_1fr] grid-rows-[100%] absolute lg:h-full lg:pl-[var(--size-navbar-w)] pointer-events-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarWrapper;
