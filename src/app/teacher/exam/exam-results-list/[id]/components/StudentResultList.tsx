import { IStudentResult } from "@/interfaces";
import StudentResultCard from "./StudentResultCard";

interface StudentResultListProps {
  studentResults: IStudentResult[];
}

const StudentResultList: React.FC<StudentResultListProps> = (props) => {
  const { studentResults } = props;

  return (
    <div className="mt-6 grid grid-cols-12 gap-4">
      {studentResults?.map((studentResult) => (
        <StudentResultCard studentResult={studentResult} key={studentResult.id} />
      ))}
    </div>
  );
};

export default StudentResultList;
