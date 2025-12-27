import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, User } from "lucide-react";
import Link from "next/link";

type Props = {
  data: IberboxMapped.ChatHeaderType;
};

const ChatHeader = ({ data }: Props) => {
  return (
    <div className="w-full h-size-topbar p-2 px-4 border-b bg-card flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/outbox" className="block lg:hidden">
          <ArrowLeft />
        </Link>
        <div className="flex flex-col truncate">
          <h2>{data.name}</h2>
          <div className="flex items-center gap-1 truncate">
            <Avatar className="size-4">
              <AvatarImage
                src={data?.contact?.avatar}
                alt={data?.contact?.name}
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground truncate">
              {data?.contact?.name}
            </p>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Settings />
      </Button>
    </div>
  );
};

export default ChatHeader;
