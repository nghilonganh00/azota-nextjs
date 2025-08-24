import { useRouter } from "next/navigation";
import { StudentClassWithSubmissions } from "../libs/interface";
import StudentAvatar from "./Avatar";
import ResultStatus from "./ResultStatus";

interface StudentResultBoxProps {
  data: StudentClassWithSubmissions;
}

const StudentResultBox: React.FC<StudentResultBoxProps> = (props) => {
  const router = useRouter();

  const { data } = props;
  const { fullname, homeworkSubmissions } = data;

  const handleClickBox = () => {
    if (homeworkSubmissions.length > 0 && homeworkSubmissions[0]?.id) {
      router.push(`/teacher/homework/mark-homework/homework-submission/${homeworkSubmissions[0].id}`);
    }
  };

  return (
    <div
      className="col-span-6 rounded-md bg-slate-100 px-4 py-5 shadow-sm duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-lg dark:bg-darkmode-400 lg:col-span-4"
      onClick={handleClickBox}
    >
      <div className="flex items-center justify-start gap-2">
        <StudentAvatar fullname={fullname} />
        <div className="flex-1 space-y-1">
          <div className="text-sm font-medium">{fullname}</div>
          <ResultStatus answerHistory={homeworkSubmissions} />
        </div>
      </div>
    </div>
  );
};

export default StudentResultBox;
