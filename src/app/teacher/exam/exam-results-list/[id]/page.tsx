"use client";

import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { IExam, IStudentResult } from "@/interfaces";
import { useParams } from "next/navigation";
import ExamAPI from "@/lib/api/exam";
import ExamResultAPI from "@/lib/api/examResult";
import ExamInfoArea from "./components/ExamConfigArea";
import ResultListArea from "./components/ResultListArea";

const ResultsList = () => {
  const { id: examId } = useParams<{ id: string }>();
  const [exam, setExam] = useState<IExam>({} as IExam);
  const [isOpenInfoArea, setOpenInfoArea] = useState<boolean>(true);
  const [studentResults, setStudentResults] = useState<IStudentResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (examId) {
        const response: AxiosResponse | null = await ExamAPI.getConfig(examId);
        setExam(response?.data);

        const examObj: IExam = response?.data;

        switch (examObj.assignType) {
          case "ALL":
            const response = await ExamResultAPI.getLatestByExamAndClass(examObj.id);

            if (response?.status !== 200) return;

            setStudentResults(response.data);
            break;

          case "CLASS":
            break;

          default:
            break;
        }
      }
    };

    fetchData();
  }, [examId]);

  return (
    <div className="grid grid-cols-12 gap-6 p-5">
      <ExamInfoArea exam={exam} setExam={setExam} isOpenInfoArea={isOpenInfoArea} />

      <ResultListArea
        exam={exam}
        studentResults={studentResults}
        isOpenInfoArea={isOpenInfoArea}
        setOpenInfoArea={setOpenInfoArea}
      />
    </div>
  );
};

export default ResultsList;
