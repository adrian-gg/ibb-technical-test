import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Download, File } from "lucide-react";

type Props = {
  message: IberboxMapped.RecordType;
  isLast?: boolean;
};

const ChatMessage = ({ message, isLast }: Props) => {
  const formatTime = (timestamp: number) => format(timestamp, "HH:mm");

  if (message.type === "text") {
    const textMessage = message.content as IberboxMapped.TextType;
    return (
      <>
        <div
          className={cn("flex items-end", {
            "justify-end": Boolean(textMessage.fromContact?.id),
          })}
        >
          <div
            className={cn("w-full mx-2 flex flex-col", {
              "order-1 items-end": !textMessage.fromContact?.id,
              "order-2 items-start": textMessage.fromContact?.id,
            })}
          >
            <div
              className={cn("max-w-[80%] px-4 py-2 rounded-lg shadow-sm", {
                "bg-primary text-primary-foreground sm:max-w-[70%]":
                  !textMessage.fromContact?.id,
                "bg-card text-card-foreground": textMessage.fromContact?.id,
                "rounded-br-none": isLast && !textMessage.fromContact?.id,
                "rounded-bl-none": isLast && textMessage.fromContact?.id,
              })}
            >
              <p className="text-wrap break-words whitespace-pre-wrap">
                {textMessage.content}
              </p>
              <p
                className={cn("w-full my-1 flex text-xs", {
                  "justify-end text-primary-foreground":
                    !textMessage.fromContact?.id,
                  "justify-start text-secondary-foreground":
                    textMessage.fromContact?.id,
                })}
              >
                {formatTime(textMessage.ctime)}
              </p>
            </div>
          </div>
          <Avatar
            className={cn("size-9 relative", {
              "order-1": textMessage.fromContact?.id,
              "order-2": !textMessage.fromContact?.id,
              invisible: !isLast,
            })}
          >
            <AvatarImage
              src={textMessage.fromContact?.avatar}
              alt={textMessage.fromContact?.name}
            />
          </Avatar>
        </div>
      </>
    );
  } else if (message.type === "file") {
    const fileMessage = message.content as IberboxMapped.FileType;
    return (
      <div
        className={cn("flex items-end", {
          "justify-end": Boolean(fileMessage.fromContact?.id),
        })}
      >
        <div
          className={cn("w-full mx-2 flex flex-col", {
            "order-1 items-end": !fileMessage.fromContact?.id,
            "order-2 items-start": fileMessage.fromContact?.id,
          })}
        >
          <div
            className={cn("max-w-[80%] px-4 py-2 rounded-lg", {
              "bg-primary text-primary-foreground sm:max-w-[70%]":
                !fileMessage.fromContact?.id,
              "bg-card text-secondary-foreground": fileMessage.fromContact?.id,
              "rounded-br-none": isLast && !fileMessage.fromContact?.id,
              "rounded-bl-none": isLast && fileMessage.fromContact?.id,
            })}
          >
            <div
              className={cn("p-2 bg-secondary rounded group cursor-pointer", {
                "dark:bg-secondary/20": !fileMessage.fromContact?.id,
              })}
            >
              <Button
                size={"default"}
                variant={"link"}
                className={cn(
                  "p-0 bg-transparent rounded flex items-center gap-1",
                  {
                    "dark:text-secondary": !fileMessage.fromContact?.id,
                  }
                )}
              >
                <div className="p-2">
                  <File size={24} className="!size-6" />
                </div>
                <div className="flex items-center gap-4 pr-2">
                  <p className="font-bold ">{`${fileMessage.name}.${fileMessage.format}`}</p>

                  <Download
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    size={4}
                  />
                </div>
              </Button>
            </div>
            <p
              className={cn("w-full my-1 flex text-xs", {
                "justify-end text-primary-foreground":
                  !fileMessage.fromContact?.id,
                "justify-start text-secondary-foreground":
                  fileMessage.fromContact?.id,
              })}
            >
              {formatTime(fileMessage.ctime)}
            </p>
          </div>
        </div>
        <Avatar
          className={cn("size-8 relative", {
            "order-1": fileMessage.fromContact?.id,
            "order-2": !fileMessage.fromContact?.id,
            invisible: !isLast,
          })}
        >
          <AvatarImage
            src={fileMessage.fromContact?.avatar}
            alt={fileMessage.fromContact?.name}
          />
        </Avatar>
      </div>
    );
  }
};

export default ChatMessage;
