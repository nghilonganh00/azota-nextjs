"use client";

import { useNotification } from "@/context/notificationContext";
import { IClassroom, IHomework } from "@/interfaces";
import HomeworkAPI from "@/lib/api/homework";
import { Copy, FileText, Folder } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PublishHomework = () => {
  const { id: homeworkId } = useParams<{ id: string }>();
  const { addNotification } = useNotification();

  const [homework, setHomework] = useState<IHomework>({} as IHomework);
  const [classroom, setClassroom] = useState<IClassroom>({} as IClassroom);

  const handleCopyHomeworkURL = (homeworkURL: string) => {
    navigator.clipboard.writeText(homeworkURL);

    addNotification("Link đã được sao chép vào clipboard", "SUCCESS");
  };

  useEffect(() => {
    const fetchHomeworkConfig = async () => {
      if (homeworkId) {
        const response = await HomeworkAPI.getConfig(homeworkId);

        setClassroom(response.data.classroom);
        setHomework(response.data);

        console.log("classrooms: ", response.data.classroom);
      }
    };

    fetchHomeworkConfig();
  }, []);

  console.log(process.env.REACT_APP_FRONTEND_URL);

  return (
    <div className="">
      <div className="mx-auto mt-10 w-[600px] space-y-4 text-center text-gray-900 dark:text-slate-300">
        <div>
          <div className="text-lg font-semibold text-gray-800 dark:text-slate-300"> Xuất bản thành công 🎉 </div>

          <div className="text-sm text-gray-900 dark:text-slate-300">
            Copy link bên dưới và gửi cho học sinh. Học sinh truy cập link để làm bài và nộp bài
          </div>
        </div>

        <div className="rounded-md bg-white p-3 text-left shadow-sm dark:bg-darkmode-600">
          <div className="text-sm font-semibold">{homework?.title || "Bài tập"}</div>

          <div className="space-y-1">
            {classroom && (
              <div key={classroom.id}>
                <div className="mt-3 text-sm">{classroom.className}</div>

                <div className="mt-2 flex items-center justify-between bg-slate-100 pl-4 dark:bg-darkmode-600">
                  <input
                    type="text"
                    readOnly
                    value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homework/${homework?.hashId}`}
                    className="flex-1 bg-transparent"
                  />

                  <div className="flex items-center gap-2 rounded-e-md border border-blue-800 px-3 py-3 text-blue-800 hover:cursor-pointer hover:bg-slate-200 dark:text-blue-600">
                    <Copy strokeWidth={1.5} className="size-4" />

                    <div
                      onClick={() => {
                        handleCopyHomeworkURL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homework/${homework?.hashId}`);
                      }}
                      className="text-sm font-semibold"
                    >
                      Sao chép
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-blue-800 hover:cursor-pointer hover:bg-slate-300 dark:text-blue-600">
            <FileText strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-semibold">Quản lý danh sách nộp bài tập</div>
          </div>

          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-blue-800 hover:cursor-pointer hover:bg-slate-300 dark:text-blue-600">
            <Folder strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-semibold">Về trang bài tập trong lớp</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishHomework;
