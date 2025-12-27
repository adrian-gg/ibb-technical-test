"use client";

import ChatBody from "@/components/shared/chat/ChatBody";
import ConversationContainer from "@/components/shared/chat/ChatContainer";
import ChatInput from "@/components/shared/chat/ChatInput";
import { useConversations } from "@/hooks/useConversations";
import useData from "@/storages/useData";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import ChatHeader from "./_components/ChatHeader";

const ContactPage = () => {
  const { paramId } = useConversations();
  const { currentChat, setCurrentChat } = useData();

  useEffect(() => {
    setCurrentChat("contact", paramId as Iberbox.NodeHandle);
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
      <ChatHeader data={currentChat.header as IberboxMapped.ChatHeaderType} />
      <ChatBody messages={currentChat.body as IberboxMapped.RecordList} />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ContactPage;
