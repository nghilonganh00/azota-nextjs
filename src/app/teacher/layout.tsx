"use client";

import EditorTopBar from "@/components/EditorTopbar";
import LeftNavbar from "@/components/LeftNavbar/leftNavbar";
import { MobileMenuBar } from "@/components/MenuBar/mobileMenuBar";
import TopBar from "@/components/Topbar";
import { usePathname } from "next/navigation";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/teacher/exam/editor") {
    return (
      <div className="grid h-screen grid-rows-[auto_1fr] overflow-y-hidden">
        {/* <EditorTopBar /> */}
        <div className="scrollbar overflow-y-auto">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftNavbar />
      <div className="grid h-full flex-1 grid-rows-[auto_1fr] overflow-hidden px-4">
        <MobileMenuBar />
        <div className="grid min-h-0 grid-rows-[auto_1fr] rounded-3xl dark:bg-[rgb(var(--color-darkmode-700))]">
          <TopBar />
          <div className="scrollbar h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
