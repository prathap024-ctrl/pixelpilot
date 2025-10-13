"use client";;
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import { useCallback } from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

export const Conversation = ({
  className,
  ...props
}) => (
  <StickToBottom
    className={cn("relative w-full flex-1 overflow-y-auto", className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props} />
);

export const ConversationContent = ({
  className,
  ...props
}) => (
  <StickToBottom.Content className={cn("max-w-[46rem] mx-auto", className)} {...props} />
);

export const ConversationEmptyState = ({
  className,
  title = "",
  description = "",
  icon,
  children,
  ...props
}) => (
  <div
    className={cn(
      "absolute flex flex-col text-center gap-4 justify-center items-center size-full",
      className
    )}
    {...props}>
    {children ?? (
      <>
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <div className="space-y-1">
          <h3 className="font-semibold text-3xl">
            {title}
          </h3>
          {description && (
            <p className="dark:text-white text-muted-foreground text-lg">{description}</p>
          )}
        </div>
      </>
    )}
  </div>
);

export const ConversationScrollButton = ({
  className,
  ...props
}) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (!isAtBottom && (<Button
    className={cn("absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full", className)}
    onClick={handleScrollToBottom}
    size="icon"
    type="button"
    variant="outline"
    {...props}>
    <ArrowDownIcon className="size-4" />
  </Button>));
};
