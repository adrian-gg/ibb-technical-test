type Props = React.PropsWithChildren<object>;

const ConversationFallback = ({ children }: Props) => {
  return (
    <div className="w-full h-full p-2 bg-secondary items-center justify-center text-secondary-foreground hidden lg:flex">
      {children}
    </div>
  );
};

export default ConversationFallback;
