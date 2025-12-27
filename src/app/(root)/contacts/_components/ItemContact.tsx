import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversations } from "@/hooks/useConversations";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";

type Props = {
  item: IberboxMapped.ContactType;
};

const ItemContact = ({ item }: Props) => {
  const { name, avatar, email, handle } = item;
  const { paramId } = useConversations();

  return (
    <Link
      href={`/contacts/${item.handle}`}
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
        <div className="w-full flex items-center gap-2.5 truncate">
          <Avatar className="size-9">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemContact;
