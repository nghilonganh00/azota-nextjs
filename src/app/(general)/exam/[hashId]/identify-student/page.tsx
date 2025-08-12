"use client";

import { ExamAssignType, ExamType, IExam } from "@/interfaces";
import ExamAPI from "@/lib/api/exam";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateAnonymousLayout } from "./components/CreateAnonymousLayout";
import { NotLoggedInLayout } from "./components/NotLoggedinLayout";

export default function IdentifyStudent() {
  const router = useRouter();
  const { hashId } = useParams<{ hashId: string }>();
  const [exam, setExam] = useState<IExam | null>(null);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchExamData = async () => {
      if (!hashId) return;

      const response = await ExamAPI.previewByHashId(hashId);

      if (response?.status !== 200) return;

      const examData = response.data;

      setExam(examData);
    };

    fetchExamData();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !exam) return;

    if (exam?.type === ExamType.PRACTICE) {
      router.push(`/exam/${hashId}/take-training`);
    } else if (exam?.type === ExamType.TEST) {
      router.push(`/exam/${hashId}/take-exam`);
    }
  }, [exam]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#3c3c3c80]">
      {exam?.assignType === ExamAssignType.ALL && !isLoggedIn && <CreateAnonymousLayout />}
      {exam?.assignType !== ExamAssignType.ALL && !isLoggedIn && <NotLoggedInLayout />}
    </div>
  );
}
