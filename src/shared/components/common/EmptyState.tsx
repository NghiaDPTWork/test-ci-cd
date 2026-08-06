import { Card, CardContent } from "@/shared/components/ui/card";
import { Inbox } from "lucide-react";

export const EmptyState = ({
  message = "Không có dữ liệu nào",
}: {
  message?: string;
}) => (
  <Card className="border-dashed text-center max-w-md mx-auto shadow-none">
    <CardContent className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="p-3 rounded-full bg-muted/60">
        <Inbox className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </CardContent>
  </Card>
);
