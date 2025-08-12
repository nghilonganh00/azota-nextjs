"use client";

import { BookOpen, FileText, Folder, House, Layers, Settings, Users } from "lucide-react";
// import Logo from "../../../logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { icon: House, link: "/teacher/dashboard" },
  { icon: FileText, link: "/teacher/homework/management" },
  { icon: Folder, link: "/teacher/exam/management" },
  { icon: Layers, link: "/teacher/class/management" },
  { icon: Users, link: "/teacher/teacher-group" },
  { icon: BookOpen, link: "/document-market/list-document" },
];

const LeftNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden h-screen w-24 bg-blue-800 dark:bg-[#1b253b] md:block">
      <div className="flex flex-col items-center pt-5">
        <Link href="/">{/* <img src={Logo} alt="" className="w-10" /> */}</Link>
        <div className="mt-9 space-y-1">
          {TABS.map((tab, index) => {
            const isActive = pathname === tab.link;

            return (
              <Link href={tab.link} key={index}>
                <div
                  className={`block px-6 py-3 transition-colors duration-200 cursor-pointer ${
                    isActive ? "rounded-l-full bg-white text-blue-800" : "text-white"
                  }`}
                >
                  <tab.icon className="size-6" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-60 px-6 py-4 hover:cursor-pointer">
          <Settings className="size-6 text-white" />
        </div>
      </div>
    </nav>
  );
};

export default LeftNavbar;
