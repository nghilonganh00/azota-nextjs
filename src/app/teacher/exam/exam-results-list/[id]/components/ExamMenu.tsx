"use client";

import ExamAPI from "@/lib/api/exam";
import { FileInput, LineChart, Settings, Target, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const MENU_ITEMS = [
  {
    icon: Settings,
    label: "Cài đặt",
    link: "/teacher/exam/action-online-offline",
  },
  { icon: LineChart, label: "Thống kê", link: "", value: "" },
  { icon: Target, label: "Giám sát nâng cao", link: "", value: "" },
  { icon: FileInput, label: "Trả kết quả thi Offline", link: "", value: "" },
];

const ExamMenu = () => {
  const router = useRouter();
  const { id: examId } = useParams<{ id: string }>();

  const handleRemove = async () => {
    if (!examId) return;

    const response = await ExamAPI.remove(examId);
    if (response?.status !== 200) return;

    router.back();
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">Menu</div>

      <div className="rounded-md bg-gray-100 p-2 shadow dark:bg-inherit">
        {MENU_ITEMS?.map((item, index) => (
          <Link
            href={`${item.link}/${examId}`}
            key={index}
            className="flex items-center gap-2 rounded-md p-2 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-darkmode-400 dark:hover:text-black"
          >
            <item.icon strokeWidth={1.5} className="size-4" />
            <div className="text-sm">{item.label}</div>
          </Link>
        ))}

        <div
          className={
            "flex items-center gap-2 rounded-md p-2 text-red-600 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-darkmode-400 dark:hover:text-black"
          }
          onClick={handleRemove}
        >
          <Trash2 strokeWidth={1.5} className="size-4" />
          <div className="text-sm">Xóa</div>
        </div>
      </div>
    </div>
  );
};

export default ExamMenu;
