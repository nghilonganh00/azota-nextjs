import { BookOpen, CircleAlert, CircleHelp, FileText, Folder, Layers, Trash2, Users } from "lucide-react";
import Link from "next/link";

interface DashboardProps {}

const TABS = [
  { icon: FileText, label: "Bài tập", link: "/teacher/homework/management" },
  { icon: Folder, label: "Đề thi", link: "/teacher/exam/management" },
  { icon: Layers, label: "Quản lý lớp", link: "/teacher/class/management" },
  { icon: Users, label: "Quản lý giáo viên", link: "/teacher/teacher-group" },
  {
    icon: BookOpen,
    label: "Kho nội dung",
    link: "/document-market/list-document",
  },
];

export default function Dashboard(props: DashboardProps) {
  return (
    <div className="w-full text-gray-800">
      <div className="mx-auto w-4/5 pt-10">
        <div className="grid grid-cols-12 gap-6">
          {TABS.map((tab, index) => (
            <Link
              href={tab.link}
              key={index}
              className="col-span-6 h-full rounded-md bg-white shadow-sm duration-300 ease-in-out hover:scale-105 hover:shadow-md dark:bg-[rgb(var(--color-darkmode-600))] md:col-span-3"
            >
              <div className="p-8">
                <tab.icon className="mx-auto size-12 text-blue-800 dark:text-blue-700" strokeWidth={1.5} />
                <div className="mt-3 text-center font-medium dark:text-white">{tab.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <span className="rounded-sm bg-orange-400 px-3 py-2 text-sm font-bold text-white hover:cursor-pointer hover:bg-orange-500">
            Đăng ký cho tổ chức
          </span>
        </div>
      </div>

      <div className="mt-36 flex items-center gap-4 pl-6">
        <div className="rounded-md p-3 hover:cursor-pointer hover:bg-slate-300">
          <CircleAlert className="size-6 text-blue-800" />
        </div>
        <div className="rounded-md p-3 hover:cursor-pointer hover:bg-slate-300">
          <Trash2 className="size-6 text-blue-800" />
        </div>
        <div className="rounded-md p-3 hover:cursor-pointer hover:bg-slate-300">
          <CircleHelp className="size-6 text-blue-800" />
        </div>
      </div>
    </div>
  );
}
