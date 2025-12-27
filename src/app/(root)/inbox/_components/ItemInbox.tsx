import { useConversations } from "@/hooks/useConversations";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  item: IberboxMapped.InboxType;
};

const ItemInbox = ({ item }: Props) => {
  const { name, description, handle } = item;
  const { paramId } = useConversations();

  return (
    <Link
      href={`/inbox/${item.handle}`}
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
        <div className="w-full flex items-center gap-2 truncate">
          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemInbox;
