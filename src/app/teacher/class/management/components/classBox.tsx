import { IClassroom } from "@/interfaces";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

interface ClassBoxProps {
  classroom: IClassroom;
}

const ClassBox: React.FC<ClassBoxProps> = (props) => {
  const { classroom } = props;
  const { id, className, studentCount, classYear } = classroom;

  return (
    <Link
      href={`/teacher/class/classroom-detail/${id}`}
      className="col-span-3 space-y-2 rounded-md bg-zinc-100 p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-800">{className}</div>
        <Ellipsis className="size-5 text-gray-500" />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div>Sĩ số: {studentCount}</div>
        <div>Năm học: {classYear}</div>
      </div>
    </Link>
  );
};

export default ClassBox;
