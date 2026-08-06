import { useAuthStore } from "@/features/auth";
import { useUser } from "@/features/auth/hooks";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const token = useAuthStore((state) => state.accessToken);
  const { data: user } = useUser();

  const welcomeText = user?.fullname
    ? `Xin chào, ${user.fullname}!`
    : "Khám Phá Ngày Lễ & Lễ Hội";

  return (
    <div className="space-y-8 py-4">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-8 md:p-12 shadow-xs">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-linear-to-br from-primary/10 to-accent/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Văn hóa & Lễ hội Việt Nam
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {welcomeText}
          </h1>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Hành trình tìm hiểu các giá trị lịch sử kiêu hùng, bản sắc văn hóa
            truyền thống tinh hoa và các sự kiện quốc tế ý nghĩa trong năm.
            {token
              ? ""
              : " Hãy đăng nhập để truy cập đầy đủ các chức năng cá nhân."}
          </p>
        </div>
      </div>
    </div>
  );
}
