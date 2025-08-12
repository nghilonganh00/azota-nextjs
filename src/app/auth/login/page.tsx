"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthAPI from "@/lib/api/auth";
import UserAPI from "@/lib/api/user";

const loginSchema = z.object({
  username: z.string().nonempty("Vui lòng nhập tài khoản"),
  password: z.string().nonempty("Vui lòng nhập mật khẩu"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setServerError("");

    const response = await AuthAPI.login(data.username, data.password);

    if (response?.status === 200) {
      const loginData = response.data;
      if (loginData.accessToken) {
        localStorage.setItem("accessToken", loginData.accessToken);
        const isTeacher = loginData.user.role === "TEACHER";
        router.push(isTeacher ? "/teacher/dashboard" : "/student/classroom");
      }
    } else {
      setServerError("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      // try {
      //   const response = await UserAPI.getInfo();
      //   if (response?.status === 200) {
      //     router.replace("/");
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="w-full pt-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-[510px] flex-col items-center space-y-4 rounded-md bg-white px-6 py-4 shadow-lg dark:bg-darkmode-600 dark:text-slate-300"
      >
        <div className="text-2xl font-bold text-gray-800 dark:text-slate-300">Đăng nhập</div>

        <div className="w-full">
          <input
            {...register("username")}
            type="text"
            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm text-gray-800 shadow-sm"
            placeholder="Nhập số điện thoại, email hoặc username"
          />
          {errors.username && (
            <span className="w-full text-xs font-medium text-red-500">{errors.username.message}</span>
          )}
        </div>

        <div className="relative w-full">
          <div className="w-full">
            <input
              {...register("password")}
              type={isShowPassword ? "text" : "password"}
              className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm text-gray-800 shadow-sm"
              placeholder="Mật khẩu"
            />
            {errors.password && <span className="text-xs font-medium text-red-500">{errors.password.message}</span>}
          </div>

          <EyeOff
            className={`absolute right-2 top-2 text-gray-600 ${isShowPassword ? "hidden" : ""}`}
            strokeWidth={1.5}
            onClick={() => setIsShowPassword(true)}
          />
          <Eye
            className={`absolute right-2 top-2 text-gray-600 ${isShowPassword ? "" : "hidden"}`}
            strokeWidth={1.5}
            onClick={() => setIsShowPassword(false)}
          />
        </div>

        {serverError && <span className="w-full text-xs font-medium text-red-500">{serverError}</span>}

        <div className="w-full">
          <div className="text-sm text-gray-800 dark:text-slate-300">Quên mật khẩu ?</div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-800 py-3 text-sm font-semibold hover:cursor-pointer text-white hover:bg-blue-700"
        >
          Đăng nhập
        </button>

        <div className="flex items-center text-sm text-blue-800 dark:text-blue-600">
          <div className="text-slate-400">Bạn chưa có tài khoản?</div>
          <Link href="/auth/register" className="ml-1 underline">
            Tạo một tài khoản mới
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
