"use client";

import MenuDropdown from "@/components/Dropdown/menudropdown";
import { IMarkedExamResult } from "@/interfaces";
import { DateTimeFormat, isoDateUtil } from "@/lib/utils/date";
import Link from "next/link";
import { useParams } from "next/navigation";

interface HistoryExamDropdownProps {
  historyExam: IMarkedExamResult[];
}

const HistoryExamDropdown: React.FC<HistoryExamDropdownProps> = (props) => {
  const { historyExam } = props;

  const { id: examResultId } = useParams<{ id: string }>();

  return (
    <MenuDropdown>
      <MenuDropdown.Button>
        <div className="mt-4 rounded-md border border-gray-200 py-2 text-center shadow hover:cursor-pointer">
          <div className="font-medium text-gray-500">{`Xem các lần Thi (${historyExam?.length ?? "0"})`}</div>
        </div>
      </MenuDropdown.Button>

      <MenuDropdown.Panel>
        <div className="h-72 max-w-56 overflow-y-scroll rounded-md bg-white px-0.5 shadow-md">
          {historyExam?.map((result, key) => {
            const { id, score, startedAt, savedAt } = result;

            return (
              <MenuDropdown.Item>
                <Link href={`/teacher/exam/exam-review/${id}`} key={result.id}>
                  <div
                    className={
                      "space-y-1 rounded-md border-b border-gray-200 p-2 hover:cursor-pointer hover:bg-slate-100" +
                      (examResultId === id.toString() && "bg-slate-100")
                    }
                  >
                    <div className="text-sm font-medium">{`Lần ${historyExam.length - key} [điểm ${score}]`}</div>
                    <div className="text-xs text-slate-600">{`${isoDateUtil.toDateAndTime(
                      startedAt,
                      DateTimeFormat.FULL_DATE_TIME_FORMAT
                    )} - ${isoDateUtil.toDateAndTime(startedAt, DateTimeFormat.TIME_FORMAT)}`}</div>
                    <div className="text-xs text-slate-600">
                      {`Thời gian làm bài: ${isoDateUtil.calculateDiff(startedAt, savedAt)}`}
                    </div>
                  </div>
                </Link>
              </MenuDropdown.Item>
            );
          })}
        </div>
      </MenuDropdown.Panel>
    </MenuDropdown>
  );
};

export default HistoryExamDropdown;
