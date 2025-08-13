"use client";

import { IClassroom } from "@/interfaces";
import { ClassroomAPI } from "@/lib/api";
import { CalendarCheck, Ellipsis, Newspaper, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ClassroomCard from "./components/ClassroomCard";
import HomeworkAPI from "@/lib/api/homework";

export default function Classroom() {
  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);

  useEffect(() => {
    const fetchClassGroups = async () => {
      const response = await ClassroomAPI.getMyClassrooms();

      if (response?.status !== 200) return;
      console.log("response: ", response);
      setClassrooms(response.data);
    };

    fetchClassGroups();
  }, []);

  return (
    <div className="px-6 py-10">
      <div className="text-lg font-medium">Danh sách lớp</div>
      <div className="mt-6 flex items-center justify-between">
        <div className="relative">
          <input type="text" className="w-60 rounded-md px-2 py-2 text-sm" placeholder="Tìm kiếm theo tên lớp" />
          <Search className="absolute right-3 top-2.5 size-4 text-slate-600" />
        </div>

        <div className="flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2 shadow-sm">
          <Plus className="size-4 text-white" />
          <div className="text-sm font-medium text-white">Tìm giáo viên</div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-4">
        {classrooms?.length > 0 &&
          classrooms?.map((classroom: IClassroom) => {
            return <ClassroomCard key={classroom.id} classroom={classroom} />;
          })}

        <div className="col-span-4">
          <div className="space-y-4 rounded-md bg-white p-4 pb-12 shadow-sm">
            <div className="flex items-center justify-start gap-2">
              <div className="text-sm font-semibold">Tự do</div>
            </div>
            <div className="text-xs text-gray-500">Hiển thị bài tập, đề thi đã làm nhưng không thuộc lớp nào</div>
          </div>
        </div>
      </div>
    </div>
  );
}
