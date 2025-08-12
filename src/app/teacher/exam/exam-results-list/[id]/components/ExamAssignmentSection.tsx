import { ExamAssignType, IExam } from "@/interfaces";
import { PenSquare } from "lucide-react";

interface ExamAssignmentSectionProps {
  exam: IExam;
  setExam: React.Dispatch<React.SetStateAction<IExam>>;
}

const ExamAssignmentBox = ({ exam }: { exam: IExam }) => {
  switch (exam.assignType) {
    case ExamAssignType.CLASS:
      return (
        <div className="grid grid-cols-12 gap-2">
          {exam.examClasses.map((examClass) => (
            <div
              className="col-span-6 flex items-center justify-center rounded-md border border-gray-300 py-2"
              key={examClass.id}
            >
              <div className="text-sm font-semibold text-gray-500">{examClass?.classroom?.className || ""}</div>
            </div>
          ))}
        </div>
      );

    default:
      return (
        <div className="flex w-full items-center justify-center rounded-md border border-gray-300 py-2 dark:border-darkmode-400">
          <div className="text-sm font-semibold text-gray-500">Tất cả mọi người</div>
        </div>
      );
  }
};

export const ExamAssignmentSection: React.FC<ExamAssignmentSectionProps> = (props) => {
  const { exam, setExam } = props;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Giao cho</div>

        <button
          type="button"
          className="flex gap-2 rounded-md px-2 py-1 text-blue-800 hover:cursor-pointer hover:bg-blue-50 dark:text-blue-700 dark:hover:bg-darkmode-400"
        >
          <PenSquare strokeWidth={1.5} className="size-4" />
          <div className="text-xs font-semibold">Sửa</div>
        </button>
      </div>

      <ExamAssignmentBox exam={exam} />
    </div>
  );
};
