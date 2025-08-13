import { IHomework } from "@/interfaces";
import { DateTimeFormat, isoDateUtil } from "@/lib/utils/date";
import { useRouter } from "next/navigation";

export default function HomeworkCard({ homework }: { homework: IHomework }) {
  const router = useRouter();

  return (
    <button className="flex h-24 items-center justify-center" onClick={() => router.push("")}>
      <div className="flex h-full w-24 items-center justify-center rounded-l-md bg-slate-300 text-sm font-semibold shadow-sm">
        Chưa nộp
      </div>
      <div className="flex h-full flex-col items-start justify-center space-y-1 rounded-r-md bg-slate-200 pl-4 pr-24 text-sm shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold">{homework.title}</div>

          <img
            className="size-6 rounded-full border border-slate-200"
            src="https://lh3.googleusercontent.com/a/ACg8ocJ_iFoqcbXAa93XLL5ekog96hEVyxgkeCD7oenQOr3efwaZiQ=s96-c"
            aria-describedby="cdk-describedby-message-ng-1-28"
            cdk-describedby-host="ng-1"
          ></img>
        </div>
        <div className="flex gap-2 text-xs text-gray-500">
          <div>Bắt đầu nộp:</div>
          <div className="font-semibold">
            {isoDateUtil.toDateAndTime(homework.startDate, DateTimeFormat.FULL_DATE_TIME_FORMAT)}
          </div>
        </div>
        <div className="flex gap-2 text-xs text-gray-500">
          <div>Hạn cuối:</div>
          <div className="font-semibold text-red-500">
            {" "}
            {isoDateUtil.toDateAndTime(homework.endDate, DateTimeFormat.FULL_DATE_TIME_FORMAT)}
          </div>
        </div>
      </div>
    </button>
  );
}
