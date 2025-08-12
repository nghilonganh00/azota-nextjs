import { IClassWithHomework, IHomework } from "@/interfaces";
import HomeworkBox from "./HomeworkBox";

interface AllHomeworksProps {
  data: IClassWithHomework[];
  search: string;
}

interface ClassBoxProps {
  data: IClassWithHomework;
}

const ClassBox: React.FC<ClassBoxProps> = (props) => {
  const { data } = props;
  const { id, className, homeworks } = data;

  console.log(data);

  return (
    <div className="col-span-12 rounded-md bg-[rgb(var(--color-darkmode-600))] px-3 shadow-sm dark:bg-darkmode-600 md:col-span-4">
      <div className="flex items-center justify-between border-b border-solid py-4 dark:border-slate-600">
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-300">{className}</div>
        <div className="text-sm font-semibold text-blue-900 hover:cursor-pointer hover:text-blue-800 dark:text-blue-700">
          Xem tất cả
        </div>
      </div>

      <div className="space-y-4 py-4">
        {homeworks?.map((homework: IHomework) => {
          return <HomeworkBox homework={homework} key={homework.id} />;
        })}
      </div>
    </div>
  );
};

const AllHomeworks: React.FC<AllHomeworksProps> = (props) => {
  const { data, search } = props;

  return (
    <div>
      <div className="text-lg font-semibold dark:text-slate-300">Tất cả</div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        {Array.isArray(data) &&
          data
            ?.filter((item) => item.className.toLowerCase().includes(search.toLowerCase()))
            .map((item) => <ClassBox data={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default AllHomeworks;
