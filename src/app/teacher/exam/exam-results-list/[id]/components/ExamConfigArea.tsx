import { IExam } from "@/interfaces";
import { ChevronUp } from "lucide-react";
import { ExamGeneral } from "./ExamGeneral";
import ExamMenu from "./ExamMenu";
import { ExamAssignmentSection } from "./ExamAssignmentSection";
import { ExamContent } from "./ExamContent";

interface ExamInfoAreaProps {
  exam: IExam;
  setExam: React.Dispatch<React.SetStateAction<IExam>>;
  isOpenInfoArea: boolean;
}

const ExamInfoArea: React.FC<ExamInfoAreaProps> = (props) => {
  const { exam, setExam, isOpenInfoArea } = props;

  return (
    <div className={`${isOpenInfoArea ? "col-span-4 md:col-span-3" : "hidden"} transition-all duration-300`}>
      <div className="space-y-3 rounded-md bg-white px-3 py-4 shadow-md dark:bg-darkmode-600 dark:text-slate-300">
        <ExamGeneral exam={exam} />

        <ExamMenu />

        <ExamAssignmentSection exam={exam} setExam={setExam} />

        <ExamContent />

        <div className="flex justify-center">
          <ChevronUp strokeWidth={1.5} className="size-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default ExamInfoArea;
