"use client";

import { INewHomework } from "@/interfaces";
import { History, Info } from "lucide-react";
// import "react-datetime/css/react-datetime.css";

interface ConfigTimeProps {
  values: INewHomework;
  onChange: (name: string, newValue: string) => void;
  error: { date: string };
}

const ConfigTime: React.FC<ConfigTimeProps> = (props) => {
  const { values, onChange, error } = props;

  const handleResetDate = () => {
    onChange("startDate", "");
    onChange("endDate", "");
  };

  return (
    <div className="grid grid-cols-12 gap-x-3">
      <div className="col-span-12">
        <label htmlFor="" className="mb-2 flex items-center gap-2 text-sm font-medium">
          Thời gian nộp bài
          <Info className="size-4 text-gray-800" strokeWidth={1.5} />
        </label>
      </div>
      <div className="relative col-span-5">
        <input
          type="datetime-local"
          value={values.startDate}
          onChange={(e) => onChange("startDate", e.target.value)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm dark:border-none dark:bg-[rgb(var(--color-darkmode-800))]"
        />

        {error.date && <div className="text-xs text-red-500">{error.date}</div>}
      </div>
      <div className="relative col-span-5">
        <input
          type="datetime-local"
          value={values.endDate}
          name="endDate"
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm dark:border-none dark:bg-[rgb(var(--color-darkmode-800))]"
        />
      </div>
      <div className="col-span-2">
        <div
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 px-1 py-2 shadow-sm hover:cursor-pointer hover:bg-gray-100"
          onClick={handleResetDate}
        >
          <History className="size-4 text-gray-500" strokeWidth={1.5} />
          <div className="text-sm font-semibold text-gray-500">Đặt lại</div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="pt-2 text-xs text-gray-700 dark:text-slate-400">
          Bỏ trống nếu không muốn giới hạn thời gian.
        </div>
      </div>
    </div>
  );
};

export default ConfigTime;
