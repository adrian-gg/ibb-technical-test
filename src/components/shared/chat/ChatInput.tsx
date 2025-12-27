"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useConversations } from "@/hooks/useConversations";
import { SendHorizonal } from "lucide-react";

const FormSchema = z.object({
  content: z.string().min(1, {
    message: "You can't send an empty message.",
  }),
});

function ChatInput() {
  const { paramId } = useConversations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart } = event.target;

    if (selectionStart !== null) {
      form.setValue("content", value);
    }
  };

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    //create message
    const newMessage = {
      id: Math.floor(Math.random() * 10000),
      handle: Math.random().toString(36).substring(2, 15),
      ctime: Math.floor(Date.now() / 1000),
      message: data.content,
      toContact: paramId,
      files: [],
    };

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(newMessage, null, 2)}
          </code>
        </pre>
      ),
    });
    form.reset({ content: "" });
  };

  return (
    <>
      <div className="w-full h-size-botbar p-4 flex items-center gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex items-end gap-2"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full h-full">
                  <FormControl>
                    <TextareaAutosize
                      rows={1}
                      maxRows={5}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(handleSubmit)();
                        }
                      }}
                      onAbort={handleInputChange}
                      autoComplete="off"
                      placeholder="Text a message..."
                      className="w-full min-h-full px-4 py-3 border border-input outline-0 rounded-3xl bg-background flex items-center text-card-foreground shadow-sm resize-none focus-visible:ring-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={
                form.formState.isSubmitting || form.getValues().content === ""
              }
              size="icon"
              variant="ghost"
              type="submit"
              className="mb-1"
            >
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default ChatInput;
