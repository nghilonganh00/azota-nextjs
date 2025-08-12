"use client";

import { Layers, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Logo from "../../../logo.svg";

const TABS = [{ icon: Layers, link: "/student/classroom" }];

export default function StudentLeftNavbar() {
  const pathname = usePathname();

  return (
    <nav className="h-screen w-24 bg-blue-800">
      <div className="flex flex-col items-center pt-5">
        {/* <img src={Logo} alt="" className="w-10" /> */}
        <div className="mt-9 space-y-1">
          {TABS.map((tab, index) => {
            const isActive = pathname === tab.link;

            return (
              <Link href={tab.link} key={index}>
                <div
                  className={`block px-6 py-3 cursor-pointer transition-colors duration-200 ${
                    isActive ? "rounded-l-full bg-white text-blue-800" : "text-white"
                  }`}
                >
                  <tab.icon className="size-6" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-[512px] px-6 py-4 hover:cursor-pointer">
          <Settings className="size-6 text-white" />
        </div>
      </div>
    </nav>
  );
}
