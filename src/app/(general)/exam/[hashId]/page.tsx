"use client";

import { useEffect, useState } from "react";
import { CircleHelp, ClipboardType, Clock, QrCode, Users } from "lucide-react";
import { AxiosResponse } from "axios";
import { useParams, useRouter } from "next/navigation";
import ExamAPI from "@/lib/api/exam";
import { IExamPreview } from "@/interfaces";

export default function PreviewExam() {
  const router = useRouter();
  const { hashId } = useParams<{ hashId: string }>();
  const [examConfig, setExamConfig] = useState<IExamPreview | null>(null);

  const handleStartExam = () => {
    if (examConfig) {
      router.push(`/exam/${hashId}/identify-student`);
    }
  };

  useEffect(() => {
    const fetchExamConfigData = async () => {
      if (hashId) {
        const response: AxiosResponse | null = await ExamAPI.previewByHashId(hashId);

        if (response?.status !== 200) return;

        setExamConfig(response?.data);
      }
    };

    fetchExamConfigData();
  }, [hashId]);

  return (
    <div className="w-full pt-10">
      <div className="mx-auto w-[570px] text-center">
        <div className="rounded-md bg-white px-4 py-5 text-center shadow">
          <div className="text-lg font-medium">{examConfig?.title}</div>

          <div className="mt-4 flex w-full items-center justify-center gap-4">
            <div className="text-sm font-medium">{`Mã đề thi: ${examConfig?.hashId}`}</div>

            <QrCode strokeWidth={1.5} className="text-blue-800" />
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex">
                <Clock strokeWidth={1.5} className="c-lucide mr-2 size-4" />
                Thời gian làm bài
              </div>

              <div className="font-medium">
                {examConfig?.duration ? `${examConfig?.duration} phút` : "Không giới hạn"}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex">
                <CircleHelp strokeWidth={1.5} className="c-lucide mr-2 size-4" />
                Số lượng câu hỏi
              </div>

              <div className="font-medium">{examConfig?.questionTotal}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex">
                <ClipboardType strokeWidth={1.5} className="c-lucide mr-2 size-4" />
                Loại đề
              </div>

              <div className="font-medium">Trắc nghiệm</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex">
                <Users strokeWidth={1.5} className="c-lucide mr-2 size-4" />
                Số lượt làm đề
              </div>

              <div className="font-medium">{`${examConfig?.examResultTotal} lượt`}</div>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-orange-500 py-2 hover:cursor-pointer" onClick={handleStartExam}>
            <div className="text-sm font-medium text-white">Bắt đầu luyện tập</div>
          </div>
        </div>

        <div className="mt-6 rounded-md p-2 shadow">
          <div className="text-sm font-medium text-slate-500">Xem lịch sử làm bài</div>
        </div>
      </div>
    </div>
  );
}
