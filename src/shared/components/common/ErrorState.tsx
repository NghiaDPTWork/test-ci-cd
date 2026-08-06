import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export const ErrorState = ({
  message = "Đã có lỗi xảy ra",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => (
  <Card className="border-destructive/30 bg-destructive/5 text-center max-w-md mx-auto shadow-sm">
    <CardContent className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="p-3 rounded-full bg-destructive/10">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <div className="space-y-1.5">
        <p className="font-semibold text-destructive text-lg">Đã xảy ra lỗi!</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={onRetry || (() => window.location.reload())}
        className="mt-2 cursor-pointer"
      >
        Thử lại
      </Button>
    </CardContent>
  </Card>
);
