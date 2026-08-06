import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchemaType } from "../schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: "",
      fullname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (user: RegisterSchemaType) => {
    registerMutation.mutate(user);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md shadow-md border bg-card rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Tạo tài khoản
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Đăng ký để bắt đầu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="fullname"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                Full Name
              </Label>
              <Input
                id="fullname"
                type="text"
                placeholder="Nguyễn Văn A"
                {...register("fullname")}
                className={
                  errors.fullname
                    ? "border-destructive focus-visible:ring-destructive rounded"
                    : "bg-transparent border-input rounded"
                }
              />
              {errors.fullname && (
                <p className="text-destructive text-xs">
                  {errors.fullname.message}
                </p>
              )}
            </div>

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
                {...register("email")}
                className={
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive rounded"
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
                {...register("password")}
                className={
                  errors.password
                    ? "border-destructive focus-visible:ring-destructive rounded"
                    : "bg-transparent border-input rounded"
                }
              />
              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={
                  errors.confirmPassword
                    ? "border-destructive focus-visible:ring-destructive rounded"
                    : "bg-transparent border-input rounded"
                }
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer bg-primary text-primary-foreground rounded py-2 mt-2"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {registerMutation.isPending ? "Đang tạo tài khoản..." : "Đăng ký"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <span className="text-xs text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-primary underline font-medium">
                Đăng nhập
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
