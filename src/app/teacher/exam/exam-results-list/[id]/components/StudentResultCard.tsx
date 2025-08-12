import { IStudentResult } from "@/interfaces";
import Link from "next/link";
import StudentAvatar from "./StudentAvatar";
import { isoDateUtil } from "@/lib/utils/date";

interface StudentResultCardProps {
  studentResult: IStudentResult;
}

const StudentResultCard: React.FC<StudentResultCardProps> = (props) => {
  const { studentResult } = props;

  const { id, student, score, startedAt, savedAt } = studentResult;
  const { fullname } = student.user;

  return (
    <Link href={`/teacher/exam/exam-review/${id}`} className="col-span-6 md:col-span-4">
      <div className="rounded-md bg-white py-5 shadow-sm duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-lg">
        <div className="flex items-center justify-start gap-2 border-b border-gray-300 px-4 pb-3">
          <StudentAvatar fullname={fullname} />
          <div className="space-y-1">
            <div className="text-sm font-medium">{fullname}</div>
            {/* <div className="text-xs font-medium text-orange-600">
              Chưa chấm tự luận
            </div> */}
            <div className="text-xs font-medium text-slate-500">
              Điểm: <span className="text-gray-800">{score}</span>
            </div>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between px-4 text-gray-500">
            <div className="text-xs">Thời gian làm bài:</div>
            <div className="text-xs font-medium">{isoDateUtil.calculateDiff(startedAt, savedAt)}</div>
          </div>
          {/* <div className="flex items-center justify-between px-4 text-gray-500">
            <div className="text-xs">Số tệp tin đã nộp:</div>
            <div className="text-xs font-medium">0</div>
          </div> */}
          <div className="flex items-center justify-between px-4 text-gray-500">
            <div className="text-xs">Thời gian nộp bài:</div>
            <div className="text-xs font-medium">{isoDateUtil.calculateDiffFromNow(savedAt)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentResultCard;
