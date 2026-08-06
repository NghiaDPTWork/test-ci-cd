import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function UnAuthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Truy Cập Bị Từ Chối</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên hoặc đăng nhập bằng tài khoản có đặc quyền phù hợp.
        </p>
      </div>
      <div className="pt-2">
        <Button asChild className="cursor-pointer">
          <Link to="/">Quay về Trang Chủ</Link>
        </Button>
      </div>
    </div>
  );
}
