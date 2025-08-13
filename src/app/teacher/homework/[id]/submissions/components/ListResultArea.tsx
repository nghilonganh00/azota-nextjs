import { IClassroom } from "@/interfaces";
import { StudentClassWithSubmissions } from "../libs/interface";
import StudentResultBox from "./StudentResultBox";

interface ListResultAreaProps {
  classroom: IClassroom;
  students: StudentClassWithSubmissions[];
  search: string;
}

const ListResultArea: React.FC<ListResultAreaProps> = (props) => {
  const { classroom, students, search } = props;

  const submittedStudentTotal = students?.filter((student) => student.homeworkSubmissions.length > 0).length;

  return (
    <div className="dark:text-slate-300">
      <div className="py-4 text-sm">
        {`Danh sách nộp bài lớp: ${classroom.className} (${submittedStudentTotal}/${students.length})`}
      </div>

      <div className="rounded-md border-gray-300 bg-white p-3 pb-28 shadow-sm dark:bg-darkmode-600">
        <div className="grid grid-cols-12 gap-4">
          {students
            .filter((student) => student.fullname.toLowerCase().includes(search.toLowerCase()))
            .map((student) => (
              <StudentResultBox data={student} key={student.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListResultArea;
