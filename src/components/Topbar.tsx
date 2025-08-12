"use client";

import { ChevronLeft, Gem } from "lucide-react";
import { useEffect } from "react";
import Menu from "./Menu/menu";
import AnonymousMenu from "./Menu/anonymousMenu";
import Notification from "./Notification";

export default function TopBar() {
  const accessToken = localStorage.getItem("accessToken");

  const goBack = () => {};

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const firstSegment = pathParts[1];
    if (!accessToken) {
      if (["teacher", "student"].includes(firstSegment)) {
        console.log(`firstSegment: ${firstSegment}`);
        // navigate(`/auth/login`);
      }
    }
  }, []);

  return (
    <div className="w-full border-b border-solid border-slate-200 px-4 py-4 dark:border-slate-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-center font-medium hover:cursor-pointer" onClick={goBack}>
          <ChevronLeft strokeWidth={1.5} className="size-5 dark:text-white" />
          <span className="text-sm text-gray-800 dark:text-white">Quay lại</span>
        </div>

        <div className="flex items-center gap-5">
          <div
            className="flex items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-white hover:cursor-pointer"
            style={{
              background: "linear-gradient(-45deg, #7953cd, #0190cd, #23a6d5, #764ada)",
              backgroundSize: "500% auto",
            }}
          >
            <Gem className="size-6" strokeWidth={1.5} />
            <p className="text-xs">Nâng VIP</p>
          </div>
          <img
            alt="flag/vi.svg"
            src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/flag/vi.svg"
          ></img>

          <Notification />

          {accessToken ? <Menu /> : <AnonymousMenu />}
        </div>
      </div>
    </div>
  );
}
