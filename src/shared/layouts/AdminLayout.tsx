import { useAuthStore } from "@/features/auth";
import { useLogoutMutation } from "@/features/auth/hooks";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../components/ui/mode-toggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function AdminLayout() {
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b bg-card sticky top-0 z-50 shadow-xs">
        <div className="max-w-4xl mx-auto flex h-16 items-center justify-between px-4">
          <Link
            to="/admin"
            className="text-xl font-bold tracking-tight hover:opacity-90 transition-all flex items-center gap-2"
          >
            <ShieldAlert className="w-5 h-5 text-destructive animate-pulse" />
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-extrabold">
              FestiveHub Admin
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1.5">
              <Link
                to="/admin"
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all rounded-md",
                  location.pathname === "/admin"
                    ? "bg-destructive text-destructive-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                Dashboard
              </Link>
              <Link
                to="/"
                className="px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Về Trang Chủ
              </Link>
            </nav>

            <ModeToggle />

            {token && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                  >
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card border shadow-lg max-w-sm rounded-lg p-6">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-bold text-foreground">
                      Bạn muốn đăng xuất?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground mt-1">
                      Phiên đăng nhập sẽ kết thúc và bạn cần đăng nhập lại để
                      truy cập hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-4 gap-2 flex justify-end">
                    <AlertDialogCancel className="border border-input bg-transparent text-foreground hover:bg-muted cursor-pointer rounded px-3 py-1 text-sm">
                      Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      variant="destructive"
                      className="bg-destructive! text-white! hover:bg-destructive/90! cursor-pointer font-medium rounded-md px-4 py-2 text-sm"
                    >
                      Đăng xuất
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        <div className="mb-6 p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive flex items-center gap-3 text-sm font-semibold">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>
            Bạn đang truy cập trang Quản Trị với đầy đủ quyền hạn hệ thống.
          </span>
        </div>
        <Outlet />
      </main>

      <footer className="border-t bg-muted/40 py-6 text-center text-xs text-muted-foreground">
        <p>
          © 2026 FestiveHub Admin Panel - Quản lý trải nghiệm văn hóa & ngày lễ
        </p>
      </footer>
    </div>
  );
}
