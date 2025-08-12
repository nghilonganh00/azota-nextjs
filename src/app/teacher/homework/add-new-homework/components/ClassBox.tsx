import { IClassroom, INewHomework } from "@/interfaces";

interface ClassBoxProps {
  classroom: IClassroom;
  values: INewHomework;
  onChange: (name: string, newValue: number[]) => void;
}
const ClassBox: React.FC<ClassBoxProps> = (props) => {
  const { classroom, values, onChange } = props;
  const { id, className } = classroom;

  const handleChangeCheckBox = (id: number) => {
    const classIds = values["classroomIds"];
    const newClassIds = classIds.includes(id) ? classIds.filter((classId) => classId !== id) : [...classIds, id];

    onChange("classroomIds", newClassIds);
  };

  return (
    <div className="col-span-4 flex items-center gap-2">
      <input type="checkbox" className="dark:bg-darkmode-800 size-4" onChange={() => handleChangeCheckBox(id)} />
      <div className="text-sm">{`${className}`}</div>
    </div>
  );
};

export default ClassBox;
