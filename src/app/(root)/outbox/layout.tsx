"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import useData from "@/storages/useData";
import { Loader2 } from "lucide-react";
import ItemOutbox from "./_components/ItemOutbox";

type Props = React.PropsWithChildren<object>;

const OutboxesLayout = ({ children }: Props) => {
  const { outboxes } = useData();

  return (
    <>
      <ItemList title="Outbox">
        {outboxes ? (
          outboxes.length === 0 ? (
            <p className="w-full h-full flex justify-center items-center">
              No outbox fount.
            </p>
          ) : (
            outboxes.map((outbox) => (
              <ItemOutbox key={outbox.handle} item={outbox} />
            ))
          )
        ) : (
          <Loader2 />
        )}{" "}
      </ItemList>
      {children}
    </>
  );
};

export default OutboxesLayout;
