import ChatMessage from "./ChatMessage";

type Props = { messages: IberboxMapped.RecordList };

const ChatBody = ({ messages }: Props) => {
  return (
    <div className="w-full p-4 lg:px-8 flex flex-1 flex-col-reverse gap-2 overflow-y-auto">
      {messages.length === 0 ? (
        <p className="w-full h-full flex justify-center items-center">
          Chat empty.
        </p>
      ) : (
        messages.map((message, i) => {
          if (
            i === 0 ||
            messages[i - 1]?.content.fromContact?.id !==
              message.content.fromContact?.id
          ) {
            return (
              <ChatMessage
                key={message.content.id}
                message={message}
                isLast={true}
              />
            );
          }
          return (
            <ChatMessage
              key={message.content.id}
              message={message}
              isLast={false}
            />
          );
        })
      )}
    </div>
  );
};

export default ChatBody;
