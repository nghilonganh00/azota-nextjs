import { IClassgroup, IClassroom } from "@/interfaces";
import ClassroomPopup from "./ClassPopup";

interface ClassGroupStudentItemProps {
  classgroup: IClassgroup;
  assignedStudentIds: number[];
  setAssignedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ClassGroupStudentItem: React.FC<ClassGroupStudentItemProps> = (props) => {
  const { classgroup, assignedStudentIds, setAssignedStudentIds } = props;
  const { classgroupName, classrooms } = classgroup;

  return (
    <div className="p-2">
      <div className="text-sm">
        <span className="font-bold text-gray-700 dark:text-slate-300">{classgroupName}</span>
        <span>{` (${classgroup.classrooms.length} lớp)`} </span>
        <span className="font-medium text-blue-500">Chọn tất cả lớp</span>
      </div>

      <div className="mt-4 grid grid-cols-12">
        {classrooms.map((classroom: IClassroom) => (
          <ClassroomPopup
            key={classroom.id}
            classroom={classroom}
            assignedStudentIds={assignedStudentIds}
            setAssignedStudentIds={setAssignedStudentIds}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassGroupStudentItem;
