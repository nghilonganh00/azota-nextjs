"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import AuthAPI from "@/lib/api/auth";
import RoleTabs from "./components/roleTabs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { registerSchema } from "./lib/validation/registerSchema";

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userFullName: "",
      username: "",
      password: "",
      userRole: "STUDENT",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const response = await AuthAPI.register(data.username, data.password, data.userFullName, data.userRole);

      if (response?.status === 201) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeRole = (newRole: "STUDENT" | "TEACHER") => {
    setValue("userRole", newRole);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 dark:bg-darkmode-700">
      <div className="mx-auto max-w-md">
        <form className="rounded-lg bg-white p-8 shadow-lg dark:bg-darkmode-500" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-300">Đăng ký tài khoản</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Tạo tài khoản để bắt đầu sử dụng AZOTA</p>
          </div>

          <RoleTabs value={watch("userRole")} onChange={handleChangeRole} />

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="userFullName"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300"
              >
                Họ tên
              </label>
              <input
                id="userFullName"
                type="text"
                className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-darkmode-400 dark:bg-darkmode-800 dark:text-slate-300 ${
                  errors.userFullName ? "border-red-600" : "border-gray-300"
                }`}
                placeholder="Nhập họ tên của bạn"
                value={watch("userFullName")}
                name="userFullName"
                onChange={(e) => setValue("userFullName", e.target.value)}
                // onKeyPress={handleKeyPress}
              />
              {errors.userFullName && <p className="mt-1 text-xs text-red-600">{errors.userFullName.message}</p>}
            </div>

            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">
                Email hoặc số điện thoại
              </label>
              <input
                id="username"
                type="text"
                className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-darkmode-400 dark:bg-darkmode-800 dark:text-slate-300 ${
                  errors.username ? "border-red-600" : "border-gray-300"
                }`}
                placeholder="Nhập email hoặc số điện thoại"
                value={watch("username")}
                name="username"
                onChange={(e) => setValue("username", e.target.value)}
                // onKeyPress={handleKeyPress}
              />
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-darkmode-400 dark:bg-darkmode-800 dark:text-slate-300 ${
                    errors.password ? "border-red-600" : "border-gray-300"
                  }`}
                  placeholder="Tạo mật khẩu mạnh"
                  value={watch("password")}
                  name="password"
                  onChange={(e) => setValue("password", e.target.value)}
                  //   onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <Eye className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <EyeOff className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          {errors.root?.message && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-600">{errors.root?.message}</p>
            </div>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-darkmode-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600 dark:text-slate-400">Đã có tài khoản? </span>
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:cursor-pointer hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
