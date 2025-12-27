"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import useData from "@/storages/useData";
import { Loader2 } from "lucide-react";
import ItemInbox from "./_components/ItemInbox";

type Props = React.PropsWithChildren<object>;

const InboxesLayout = ({ children }: Props) => {
  const { inboxes } = useData();

  return (
    <>
      <ItemList title="Inbox">
        {inboxes ? (
          inboxes.length === 0 ? (
            <p className="w-full h-full flex justify-center items-center">
              No inbox fount.
            </p>
          ) : (
            inboxes.map((inbox) => <ItemInbox key={inbox.id} item={inbox} />)
          )
        ) : (
          <Loader2 />
        )}{" "}
      </ItemList>
      {children}
    </>
  );
};

export default InboxesLayout;
