import StudentAvatar from "@/app/teacher/exam/exam-results-list/[id]/components/StudentAvatar";
import { IStudentClass } from "@/interfaces";
import { StudentClassroomAPI } from "@/lib/api/studentClass";
import { Check, ChevronDown, Mars, Trash2, Venus } from "lucide-react";
import EditStudent from "./EditStudent";
import extractNameEdges from "@/lib/utils/extractNameEdges";

interface StudentTableProps {
  homeworkTotal: number;
  listStudent: IStudentClass[];
  setListStudent: (listStudent: IStudentClass[]) => void;
}

const StudentTable: React.FC<StudentTableProps> = (props) => {
  const { homeworkTotal, listStudent, setListStudent } = props;

  const handleDelete = async (id: number) => {
    const response = await StudentClassroomAPI.delete(id);
    if (response) {
      setListStudent(listStudent.filter((studentClass) => studentClass.id !== id));
    }
  };

  return (
    <table className="w-full border-separate border-spacing-x-0 border-spacing-y-3 bg-white text-sm dark:bg-darkmode-600 dark:text-slate-300">
      <thead className="">
        <tr className="">
          <th className="p-2">
            <input type="checkbox" />
          </th>
          <th>
            <div className="text-center font-semibold">{`Sĩ số: ${listStudent.length}`}</div>
          </th>
          <th>
            <div className="pl-6 text-left font-semibold">Họ và tên</div>
          </th>
          <th>
            <div className="font-semibold">Số báo danh</div>
          </th>
          <th>
            <div className="font-semibold">Bài tập đã làm</div>
          </th>
          <th>
            <div className="font-semibold">Đề thi đã làm</div>
          </th>
          <th>
            <div className="font-semibold">Hành động</div>
          </th>
        </tr>
      </thead>

      <tbody>
        {listStudent?.map((studentClass, index) => (
          <tr className="rounded-md text-center" key={studentClass.id}>
            <td className="py-6">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-darkmode-800 checked:bg-blue-500 focus:ring-0"
              />
            </td>

            <td>
              <div className="flex flex-col items-center border-r border-gray-300">
                <input
                  value={index + 1}
                  type="text"
                  className="w-12 rounded-md px-2 py-1 text-center text-sm font-normal shadow dark:bg-darkmode-800"
                />
                <ChevronDown className="mt-1 size-5" />
              </div>
            </td>

            <td className="pl-5">
              <div className="flex items-center gap-2">
                <div className="scale-90 relative">
                  <StudentAvatar fullname={extractNameEdges(studentClass.fullname)} />

                  {studentClass?.student && (
                    <div className="absolute right-0 bottom-0.5 size-4 flex items-center justify-center rounded-full bg-green-300">
                      <Check color="white" size={12} strokeWidth={2} />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <div className="font-semibold text-gray-900 dark:text-slate-300">{studentClass.fullname}</div>

                  <span className={"material-symbols-outlined text-lg "}>
                    {studentClass.gender ? <Mars color="blue" size={20} /> : <Venus color="pink" size={20} />}
                  </span>
                </div>
              </div>
            </td>

            <td>
              <div>{studentClass?.identificationNumber || ""}</div>
            </td>

            <td>
              <div>{`${studentClass?.homeworkResults?.length || 0} / ${homeworkTotal} bài tập`}</div>
            </td>

            <th></th>

            <td>
              <div className="flex items-center justify-center gap-3">
                <EditStudent studentClass={studentClass} />

                <div
                  onClick={() => handleDelete(studentClass.id)}
                  className="flex items-center gap-2 rounded-md border border-red-500 px-2 py-1.5 text-red-500 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="size-4" />
                  <div className="text-xs font-semibold">Xóa</div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
