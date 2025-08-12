import { z } from "zod";

export const registerSchema = z.object({
  userFullName: z.string().min(1, "Họ tên không được để trống"),
  username: z
    .string()
    .min(1, "Email/SĐT không được để trống")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[0-9]{10,11}$/.test(val), {
      message: "Email hoặc số điện thoại không hợp lệ",
    }),
  password: z
    .string()
    .min(6, "Mật khẩu phải từ 6 ký tự")
    .max(30, "Tối đa 30 ký tự")
    .refine((val) => /[A-Z]/.test(val) && /[a-z]/.test(val) && /\d/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt",
    }),
  userRole: z.enum(["STUDENT", "TEACHER"]),
});
