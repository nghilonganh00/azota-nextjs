"use client";

import StudentLeftNavbar from "@/components/LeftNavbar/StudentLeftNavbar";
import TopBar from "@/components/Topbar";

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-y-hidden">
      <StudentLeftNavbar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

export default StudentLayout;
