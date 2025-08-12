"use client";

import { Moon } from "lucide-react";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex h-screen overflow-y-hidden dark:bg-darkmode-700">
        <div className="flex flex-1 flex-col">
          <div className="w-full border-b border-solid border-slate-200 px-8 py-4 dark:border-darkmode-400 ">
            <div className="flex items-center justify-between">
              <img
                width="95px"
                src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/images/logo.svg"
              ></img>

              <div className="flex items-center gap-2">
                <Moon className="size-5 text-gray-500" strokeWidth={1.5} />
                <div className="text-sm font-semibold text-gray-500">Chế độ tối</div>
              </div>
            </div>
          </div>

          <div className="scrollbal flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
