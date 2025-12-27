import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useConversations = () => {
  const params = useParams();

  const paramId = useMemo(
    () =>
      params?.contactId ||
      params?.inboxId ||
      params?.outboxId ||
      ("" as string),
    [params?.contactId, params?.inboxId, params?.outboxId]
  );
  const isChatActive = useMemo(() => !!paramId, [paramId]);

  return { paramId, isChatActive };
};
