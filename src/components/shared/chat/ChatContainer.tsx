type Props = React.PropsWithChildren<object>;

const ConversationContainer = ({ children }: Props) => {
  return (
    <div className="w-full h-svh bg-secondary flex flex-col pointer-events-auto lg:h-full">
      {children}
    </div>
  );
};

export default ConversationContainer;
