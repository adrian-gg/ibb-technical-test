import { Inbox, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const pathname = usePathname();
  const paths = useMemo(
    () => [
      {
        href: "/contacts",
        label: "Contacts",
        icon: Users,
        active: pathname.startsWith("/contacts"),
      },
      {
        href: "/inbox",
        label: "Inbox",
        icon: Inbox,
        active: pathname.startsWith("/inbox"),
      },
      {
        href: "/outbox",
        label: "Outbox",
        icon: MessageSquare,
        active: pathname.startsWith("/outbox"),
      },
    ],
    [pathname]
  );

  return paths;
};
