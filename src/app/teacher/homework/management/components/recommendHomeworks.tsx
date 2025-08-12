import { IHomework } from "@/interfaces";
import HomeworkBox from "./HomeworkBox";

interface RecommendHomeworksProps {
  className?: string;
  listHomework: IHomework[];
}

const RecommendHomeworks: React.FC<RecommendHomeworksProps> = (props) => {
  const { className, listHomework } = props;

  return (
    <div className={`${className}`}>
      <div className="mb-4 text-lg font-semibold dark:text-slate-300">Được đề xuất</div>

      <div className="grid grid-cols-12 gap-6">
        {listHomework?.map((homework) => {
          return <HomeworkBox homework={homework} key={homework.id} />;
        })}
      </div>
    </div>
  );
};

export default RecommendHomeworks;
