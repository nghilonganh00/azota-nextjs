"use client";
import { useState } from "react";
// import Logo from "../../../logo.svg";
import { BookOpen, ChartNoAxesGantt, FileText, Folder, Home, House, Layers, Users, XCircle } from "lucide-react";
import Link from "next/link";

const MENU_TABS = [
  { title: "Màn hình chính", icon: House, link: "/teacher/dashboard" },
  { title: "Bài tập", icon: FileText, link: "/teacher/homework/management" },
  { title: "Đề thi", icon: Folder, link: "/teacher/exam/management" },
  { title: "Quản lý lớp", icon: Layers, link: "/teacher/class/management" },
  { title: "Quản lý giáo viên", icon: Users, link: "/teacher/teacher-group" },
  { title: "Kho nội dung", icon: BookOpen, link: "/document-market/list-document" },
];

export const MobileMenuBar = () => {
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);

  const toggleOpenPopup = () => {
    setOpenPopup((preValue) => !preValue);
  };

  return (
    <div className="block bg-blue-800 py-4 dark:bg-[rgb(var(--color-darkmode-800))] md:hidden">
      <div className="flex items-center justify-between pl-4">
        {/* <img src={Logo} alt="" className="w-10" /> */}

        <div className="hover:cursor-pointer" onClick={toggleOpenPopup}>
          <ChartNoAxesGantt strokeWidth={1.6} className="size-6 text-white" />
        </div>
      </div>

      {isOpenPopup && (
        <div className="fixed inset-0 z-40">
          <div className="absolute left-0 top-0 z-40 h-screen w-screen bg-black opacity-90"></div>

          <div className="absolute right-4 top-4 z-50 hover:cursor-pointer" onClick={toggleOpenPopup}>
            <XCircle className="size-8 text-white" strokeWidth={1.6} />
          </div>

          <aside className="relative z-50 h-full w-64 bg-[rgb(var(--color-darkmode-800))]">
            <ul className="pt-2 text-white">
              {MENU_TABS.map((tab) => (
                <li>
                  <Link href={tab.link} className="flex h-12 items-center gap-3 px-6">
                    <tab.icon strokeWidth={1.6} className="size-6" />
                    <div>{tab.title}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
};
