"use client";

import Popup from "@/components/Popup";
import { IExam } from "@/interfaces";
import ExamAPI from "@/lib/api/exam";
import { Copy, Download, FileText, PenSquare, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ExamContentProps {}

export const ExamContent: React.FC<ExamContentProps> = (props) => {
  const { id: examId } = useParams<{ id: string }>();
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);
  const [exam, setExam] = useState<IExam | null>(null);

  const handleTogglePopup = () => {
    setOpenPopup(!isOpenPopup);
  };

  useEffect(() => {
    const fetchExamContent = async () => {
      if (!examId) return;

      const response = await ExamAPI.getContent(examId);
      if (response?.status !== 200) return;

      setExam(response.data);
    };

    fetchExamContent();
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Nội dung</div>
        <button
          type="button"
          className="flex gap-2 rounded-md px-2 py-1 text-blue-800 hover:cursor-pointer hover:bg-blue-50 dark:text-blue-700 dark:hover:bg-darkmode-400"
        >
          <PenSquare strokeWidth={1.5} className="size-4" />
          <div className="text-xs font-semibold">Sửa</div>
        </button>
      </div>

      <div
        className="flex items-center gap-2 text-blue-800 hover:cursor-pointer hover:opacity-80 dark:text-blue-700"
        onClick={handleTogglePopup}
      >
        <FileText className="size-4" />
        <div className="text-sm font-medium">Xem chi tiết</div>
      </div>

      <Popup isOpen={isOpenPopup} setOpen={setOpenPopup}>
        <div className="grid h-[70vh] w-[800px] max-w-[90vw] grid-cols-1 grid-rows-[auto,1fr] rounded bg-white shadow">
          <div className="flex items-center justify-between rounded bg-gray-100 p-2">
            <div className="flex items-center gap-2">
              <div className="rounded p-1.5 hover:cursor-pointer hover:bg-zinc-200">
                <Download className="w-[18px] text-slate-500" strokeWidth={1.6} />
              </div>

              <div className="flex items-center gap-2 rounded p-1.5 hover:cursor-pointer hover:bg-zinc-200">
                <Copy className="size-4 text-slate-500" strokeWidth={1.8} />
                <div className="text-xs font-medium text-slate-500">Copy link</div>
              </div>

              <div className="flex items-center gap-2 rounded p-1.5 hover:cursor-pointer hover:bg-zinc-200">
                <div className="text-xs font-medium text-slate-500">Hiện giải thích</div>
              </div>
            </div>

            <div className="rounded p-1.5 hover:cursor-pointer hover:bg-red-100" onClick={handleTogglePopup}>
              <X className="size-4 text-red-500" />
            </div>
          </div>

          <div className="round- space-y-10 overflow-y-scroll px-5 pt-8 text-gray-700 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-2">
            {exam?.questionParts.map((part) => {
              return (
                <div key={exam.id}>
                  <h3 className="font-semibold">{part.title}</h3>

                  <div className="mt-4">
                    {part?.questions.map((question) => {
                      const correctOptionKeys = question?.options
                        .filter((option) => option.isCorrect)
                        .map((option) => option.key);

                      return (
                        <div className="" key={question.id}>
                          <h1 className="font-semibold">{`Câu ${question.rawIndex}`}</h1>
                          <p className="py-1 leading-relaxed">{question.topic}</p>

                          <ul className="mt-6 space-y-8">
                            {question?.options.map((option, key) => (
                              <li key={question.id}>
                                <span className="font-semibold">{option.key.toLocaleLowerCase()}. </span>
                                {option.content}
                              </li>
                            ))}
                          </ul>

                          <p className="mt-8 font-semibold text-success">{`Đáp án: ${correctOptionKeys.join(",")}`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Popup>
    </div>
  );
};
