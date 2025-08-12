"use client";

import { IExam, IMarkedExamResult } from "@/interfaces";
import ExamAPI from "@/lib/api/exam";
import ExamResultAPI from "@/lib/api/examResult";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReviewDetail from "./components/ReviewDetail";
import ReviewExamContent from "./components/ReviewExamContent";

const ExamReview = () => {
  const { id: examResultId } = useParams<{ id: string }>();

  const [examResult, setExamResult] = useState<IMarkedExamResult | null>(null);
  const [history, setHistory] = useState<IMarkedExamResult[]>([]);
  const [exam, setExam] = useState<IExam | null>(null);

  useEffect(() => {
    //Fetch the infomation of examResult, history of exam
    const fetchData = async () => {
      if (examResultId) {
        const examResultRes = await ExamResultAPI.getMark(examResultId);
        if (examResultRes?.status !== 200) return;

        const examResultData: IMarkedExamResult = examResultRes.data;
        setExamResult(examResultData);

        const [examRes, historyRes] = await Promise.all([
          ExamAPI.getContent(examResultData.examId.toString()),
          ExamResultAPI.getHistory(examResultData.examId, examResultData.studentId),
        ]);
        if (historyRes?.status === 200) setHistory(historyRes.data);
        if (examRes?.status === 200) setExam(examRes.data);
      }
    };

    fetchData();
  }, [examResultId]);

  return (
    <div className="flex items-start gap-4 p-5">
      <ReviewDetail examReview={examResult} history={history} />
      {examResult && exam && <ReviewExamContent examResult={examResult} exam={exam} />}
    </div>
  );
};

export default ExamReview;
