import * as z from "zod";

// Register Schema
export const registerSchema = z
  .object({
    // Validation cho email
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .email({ message: "Email không đúng định dạng" }),

    // Validation cho fullname
    fullname: z.string().min(1, { message: "Tên không được để trống" }).min(3, {
      message: "Tên phải ít nhất 3 ký tự",
    }),

    // Validation cho password
    password: z
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Phải có ít nhất 1 chữ hoa",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Phải có ít nhất 1 số",
      })
      .refine((val) => /[!@#$%^&*]/.test(val), {
        message: "Phải có ít nhất 1 ký tự đặc biệt",
      }),

    // Validation cho confirm_password
    confirmPassword: z.string(),
  })
  // Super refine để thêm validation tùy chỉnh giữa các field với nhau
  // (như confirmPassword phải khớp với password) => Nhiều field
  // Refine cho phép chúng ta thêm validation tùy chỉnh sau khi đã validate các field riêng lẻ
  // => 1 field
  .superRefine(({ password, confirmPassword }, ctx) => {
    // Custom validation để kiểm tra confirmPassword có khớp với password hay không
    if (confirmPassword !== password) {
      // ctx là context của validation,
      // chúng ta có thể dùng nó để thêm lỗi tùy chỉnh vào field nào đó
      ctx.addIssue({
        code: "custom",
        message: "Nhập lại mật khẩu không khớp",
        path: ["confirmPassword"],
        // Gán lỗi vào field này nhé !!!
      });
    }
  });

// Export type để dùng cho RHF(React Hook Form)
// Dùng infer để tự động suy luận type từ schema, tránh phải duplicate type
export type RegisterSchemaType = z.infer<typeof registerSchema>;

// Login Schema
export const loginSchema = z.object({
  // Validation cho email
  email: z
    .string()
    .min(1, { message: "Email không được để trống" })
    .email({ message: "Email không đúng định dạng" }),

  // Validation cho password
  password: z
    .string()
    .min(1, { message: "Password là bắt buộc" })
    .min(6, { message: "Password phải ít nhất 6 ký tự" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
