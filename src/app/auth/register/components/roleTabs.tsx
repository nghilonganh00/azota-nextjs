import { GraduationCap, User } from "lucide-react";

interface RoleTabsProps {
  value: "STUDENT" | "TEACHER";
  onChange: (newRole: "STUDENT" | "TEACHER") => void;
}

const ROLETABS = [
  {
    label: "Học sinh",
    value: "STUDENT",
    icon: GraduationCap,
  },
  {
    label: "Giáo viên",
    value: "TEACHER",
    icon: User,
  },
];

const RoleTabs: React.FC<RoleTabsProps> = (props) => {
  const { value, onChange } = props;

  return (
    <div className="flex w-full items-center">
      {ROLETABS.map((tab, index) => (
        <div
          key={index}
          onClick={() => onChange(tab.value as "STUDENT" | "TEACHER")}
          className={
            "flex-1 border-b-2 py-2 hover:cursor-pointer dark:border-darkmode-600" +
            (value === tab.value ? "border-b-2 border-blue-800" : "")
          }
        >
          <div
            className={
              "flex items-center justify-center gap-2 " +
              (value === tab.value ? "dark:text-slate-300" : "text-gray-600 dark:text-slate-600")
            }
          >
            <tab.icon strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-semibold">{tab.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleTabs;
