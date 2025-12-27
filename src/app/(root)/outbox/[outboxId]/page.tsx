"use client";

import ChatBody from "@/components/shared/chat/ChatBody";
import ConversationContainer from "@/components/shared/chat/ChatContainer";
import { useConversations } from "@/hooks/useConversations";
import useData from "@/storages/useData";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import ChatHeader from "./_components/ChatHeader";

const OutboxPage = () => {
  const { paramId } = useConversations();
  const { currentChat, setCurrentChat } = useData();

  useEffect(() => {
    setCurrentChat("outbox", paramId as Iberbox.NodeHandle);
  }, [paramId, setCurrentChat]);

  return currentChat === undefined ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 className="size-8" />
    </div>
  ) : currentChat === null ? (
    <p className="w-full h-full flex justify-center items-center">
      No records found.
    </p>
  ) : (
    <ConversationContainer>
      <ChatHeader data={currentChat.header} />
      <ChatBody messages={currentChat.body as IberboxMapped.RecordList} />
    </ConversationContainer>
  );
};

export default OutboxPage;
