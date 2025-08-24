import { IClassroom, IHomework } from "@/interfaces";
import HomeworkAPI from "@/lib/api/homework";
import { CalendarCheck, Ellipsis, Newspaper, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import HomeworkCard from "./HomeworkCard";
import Image from "next/image";

export default function ClassroomCard({ classroom }: { classroom: IClassroom }) {
  const [upcomingHomeworks, setUpcomingHomeworks] = useState<IHomework[]>([]);

  useEffect(() => {
    const fetchMyUpcomingHomeworks = async () => {
      const response = await HomeworkAPI.getMyUpcomingInClassroom(classroom.id.toString());

      if (response?.status !== 200) return;
      console.log("response: ", response);
      setUpcomingHomeworks(response.data);
    };

    fetchMyUpcomingHomeworks();
  }, [classroom.id]);

  return (
    <div className="md:col-span-4 col-span-6">
      <div className="space-y-4 rounded-md bg-white p-4 pb-12 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={classroom.teacher.user.avatarURL}
                alt="User Avatar"
                width={36}
                height={36}
                className="dark:border-darkmode-400 rounded-full border border-slate-200"
              />
              <div className="">
                <div className="text-sm font-semibold">Thầy {classroom.teacher.user.fullname}</div>
                <div className="text-xs font-semibold text-blue-800">{classroom.className}</div>
              </div>
            </div>

            <Ellipsis className="size-5 text-gray-900" strokeWidth={1.5} />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-700">
            <div>Sĩ số: {classroom.studentClasses.length}</div>
            <div>Năm học: {classroom.classYear}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-start gap-2">
            <CalendarCheck strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-semibold">{`Bài tập, Đề thi chưa làm (${upcomingHomeworks.length} đề thi)`}</div>
          </div>
          <div className="space-y-4 px-2 py-4">
            {upcomingHomeworks.slice(0, 2).map((homework: IHomework) => {
              return <HomeworkCard key={homework.id} homework={homework} />;
            })}

            {upcomingHomeworks.length > 2 && (
              <div className="flex items-center justify-center">
                <Plus className="size-3 text-blue-800" />
                <div className="text-xs font-semibold text-blue-900">{`${upcomingHomeworks.length - 2} Xem thêm`}</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-start gap-2">
          <Newspaper strokeWidth={1.5} className="size-4" />
          <div className="text-sm font-semibold">Bảng tin</div>
        </div>
      </div>
    </div>
  );
}
