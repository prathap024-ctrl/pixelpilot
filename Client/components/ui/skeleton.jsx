import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted-foreground/50 animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
