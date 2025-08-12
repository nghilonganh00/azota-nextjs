import { FolderPlus, Landmark, PlusIcon, Search } from "lucide-react";
import Link from "next/link";
const ExamActions = () => {
  return (
    <div className="flex items-center justify-between text-gray-800">
      <div className="relative">
        <input
          type="text"
          className="w-60 rounded-md px-2 py-2 text-sm dark:bg-[rgb(var(--color-darkmode-800))]"
          placeholder="Tìm kiếm"
        />
        <Search className="absolute right-3 top-2.5 size-4 text-slate-600 dark:text-slate-400" />
      </div>
      <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
        <div className="flex h-10 items-center gap-2 rounded-md bg-cyan-500 px-8 text-sm font-bold text-white">
          <Landmark />
          <span>Tạo đề từ ngân hàng chung</span>
        </div>
        <Link
          href={"/teacher/exam/add-new"}
          className="flex h-10 items-center gap-2 rounded-md bg-lime-500 px-14 py-2.5 text-sm font-bold text-white"
        >
          <PlusIcon className="size-4" />
          <span>Tạo đề thi</span>
        </Link>
        <div className="flex h-10 items-center gap-2 rounded-md bg-blue-800 px-14 py-2.5 text-sm font-bold text-white">
          <FolderPlus className="size-4" />
          <span>Tạo thư mục</span>
        </div>
      </div>
    </div>
  );
};

export default ExamActions;
