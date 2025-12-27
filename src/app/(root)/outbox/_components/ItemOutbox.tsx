import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversations } from "@/hooks/useConversations";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";

type Props = {
  item: IberboxMapped.OutboxType;
};

const ItemOutbox = ({ item }: Props) => {
  const { name, contact, handle } = item;
  const { paramId } = useConversations();

  return (
    <Link
      href={`/outbox/${handle}`}
      className={cn("w-full", {
        "pointer-events-none": paramId === handle,
      })}
    >
      <div
        className={cn(
          "w-full px-3 py-2 border-b flex flex-row justify-between items-center gap-2 hover:bg-muted/50",
          {
            "bg-gradient-to-r from-secondary via-secondary to-card text-secondary-foreground":
              paramId === handle,
          }
        )}
      >
        <div className="flex items-center gap-2 truncate">
          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
            <div className="flex items-center gap-1 truncate">
              <Avatar className="size-4">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground truncate">
                {contact.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemOutbox;
