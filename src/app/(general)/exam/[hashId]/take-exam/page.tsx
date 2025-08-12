"use client";

import { IExam, IExamAnswer, IExamResult, IQuestion } from "@/interfaces";
import ExamAPI from "@/lib/api/exam";
import ExamResultAPI from "@/lib/api/examResult";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionBar from "./components/QuestionBar";

import TakeExamHeader from "./components/TakeExamHeader";
import TakeExamArea from "./components/TakeExamArea";

const TakeExam = () => {
  const router = useRouter();

  const { hashId } = useParams<{ hashId: string }>();
  const examStartTime = new Date().toString();

  const [exam, setExam] = useState<IExam | null>(null);
  const [examAnswers, setExamAnswers] = useState<IExamAnswer[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const handleSaveExamAnwers = async () => {
    if (!exam) return;

    const examAnswersString = JSON.stringify(examAnswers);

    const response = await ExamResultAPI.create(exam.hashId, examAnswersString, examStartTime);

    if (response?.status !== 201) return;

    return response.data;
  };

  const handleFinish = async () => {
    const newExamResult: IExamResult = await handleSaveExamAnwers();
    if (newExamResult) {
      router.push(`/exam/submit-exam/${newExamResult.id}`);
    }
  };

  useEffect(() => {
    const fetchExamData = async () => {
      if (hashId) {
        const response = await ExamAPI.getContentByHashId(hashId);

        if (response?.status !== 200) return;

        const examData: IExam = response.data;

        setExam(examData);
        setQuestions(() => {
          const questions = examData.questionParts.reduce((acc, questionPart) => {
            acc.push(...questionPart.questions);
            return acc;
          }, [] as IQuestion[]);

          return questions;
        });
      }
    };

    fetchExamData();
  }, [hashId]);

  return (
    <div>
      {exam && <TakeExamHeader exam={exam} handleFinish={handleFinish} />}

      <div className="grid h-screen grid-cols-12 gap-5 overflow-y-scroll px-2 pt-20">
        {exam && (
          <TakeExamArea
            questionParts={exam.questionParts}
            examAnswers={examAnswers}
            setExamAnswers={setExamAnswers}
            exam={exam}
          />
        )}

        {exam && <QuestionBar questions={questions} examAnswers={examAnswers} />}
      </div>
    </div>
  );
};

export default TakeExam;
