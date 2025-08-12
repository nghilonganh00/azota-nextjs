import { IClassgroup } from "@/interfaces";
import { ArrowDown01, Filter } from "lucide-react";
import AddClassBtn from "./AddClassBtn";
import CreateUpLevelClass from "./CreateUpLevelClass";

interface ClassActionsProps {
  classGroupList: IClassgroup[];
  setClassGroupList: React.Dispatch<React.SetStateAction<IClassgroup[]>>;
}

const ClassActions: React.FC<ClassActionsProps> = (props) => {
  const { classGroupList, setClassGroupList } = props;

  return (
    <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
      <div className="text-xl font-medium">Danh sách lớp</div>
      <div className="flex items-center justify-between gap-2">
        <AddClassBtn classGroupList={classGroupList} setClassGroupList={setClassGroupList} />

        <CreateUpLevelClass />

        <div className="flex h-10 items-center gap-2 rounded-md bg-white px-2 text-sm font-semibold shadow-md hover:cursor-pointer hover:bg-slate-100 dark:bg-[rgb(var(--color-darkmode-600))]">
          <ArrowDown01 className="size-4 text-gray-600" />
          <span>Đánh số báo danh</span>
        </div>
        <div className="flex h-10 items-center gap-2 rounded-md bg-white px-2 text-sm font-semibold shadow-md hover:cursor-pointer hover:bg-slate-100 dark:bg-[rgb(var(--color-darkmode-600))]">
          <Filter className="size-4 text-gray-600" />
          <span>Bộ lọc</span>
        </div>
      </div>
    </div>
  );
};

export default ClassActions;
