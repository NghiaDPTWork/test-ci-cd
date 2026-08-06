import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  message?: string;
}

export const LoadingState = ({
  className,
  size = "md",
  message = "Đang tải dữ liệu...",
}: LoadingStateProps) => {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-20 gap-4",
        className,
      )}
    >
      <Loader2 className={cn("animate-spin text-primary", iconSizes[size])} />
      <p className="text-muted-foreground animate-pulse text-sm font-medium">
        {message}
      </p>
    </div>
  );
};
