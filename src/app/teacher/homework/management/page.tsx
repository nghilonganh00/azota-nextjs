"use client";

import { IClassWithHomework, IHomework } from "@/interfaces";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import RecommendHomeworks from "./components/recommendHomeworks";
import AllHomeworks from "./components/allHomeworks";
import HomeworkAPI from "@/lib/api/homework";
import { ClassroomAPI } from "@/lib/api";

const HomeworkManage = () => {
  const [recommendHomework, setRecommendHomework] = useState<IHomework[]>([]);
  const [classWithHomework, setClassWithHomework] = useState<IClassWithHomework[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const [homeworkRes, classroomRes] = await Promise.all([
        HomeworkAPI.getAll("updatedAt", "ASC", 4),
        ClassroomAPI.getHomeworks(),
      ]);
      if (!homeworkRes || !classroomRes) return;

      setRecommendHomework(homeworkRes.data);
      setClassWithHomework(classroomRes.data);
    };

    fetchData();
  }, []);
  return (
    <div className="w-full p-6 pt-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              className="w-60 rounded-md px-2 py-2 text-sm dark:bg-[rgb(var(--color-darkmode-800))] dark:text-slate-300"
              placeholder="Tìm kiếm theo tên lớp"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 size-4 text-slate-600 dark:text-slate-300" />
          </div>
          <Link
            href={"/teacher/homework/add-new-homework"}
            className="flex items-center gap-2 rounded-md bg-[#68cc00] px-3 py-2.5 hover:bg-lime-500"
          >
            <Plus className="text-white" />
            <span className="text-sm font-bold text-white">Tạo bài tập</span>
          </Link>
        </div>

        <RecommendHomeworks listHomework={recommendHomework} />
        <AllHomeworks data={classWithHomework} search={search} />
      </div>
    </div>
  );
};

export default HomeworkManage;
