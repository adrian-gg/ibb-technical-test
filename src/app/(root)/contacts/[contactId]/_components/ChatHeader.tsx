import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, User } from "lucide-react";
import Link from "next/link";

type Props = {
  data: IberboxMapped.ChatHeaderType;
};

const ChatHeader = ({ data }: Props) => {
  return (
    <div className="w-full h-size-topbar p-2 pr-4 border-b bg-card flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/contacts" className="block lg:hidden">
          <ArrowLeft />
        </Link>
        <Avatar className="size-9">
          <AvatarImage src={data?.contact?.avatar} alt={data?.contact?.name} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <h2>{data?.contact?.name}</h2>
      </div>
      <Button variant="ghost" size="icon">
        <Settings />
      </Button>
    </div>
  );
};

export default ChatHeader;
