import { useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks";
import { loginSchema, type LoginSchemaType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Loader2, Lock, Mail } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const loginMutation = useLoginMutation();
  console.log("LoginPage render");

  const {
    register: login,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "t.nghia2112278@gmail.com",
      password: "12345678",
    },
  });

  const handleLogin = async (user: LoginSchemaType) => {
    loginMutation.mutate(user);
    //
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md shadow-md border bg-card rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Đăng nhập để tiếp tục
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...login("email")}
                className={
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive rounded bg-transparent"
                    : "bg-transparent border-input rounded"
                }
              />
              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...login("password")}
                className={
                  errors.password
                    ? "border-destructive focus-visible:ring-destructive rounded bg-transparent"
                    : "bg-transparent border-input rounded"
                }
              />
              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer bg-primary text-primary-foreground rounded py-2 mt-2"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loginMutation.isPending ? "Đang đăng nhập..." : "Login"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <span className="text-xs text-muted-foreground">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-primary underline font-medium"
              >
                Đăng ký ngay
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
